import * as path from 'path'
import * as espree from 'espree'
import * as escodegen from 'escodegen'
import * as estraverse from 'estraverse'
import { removeFirstPartOfPath } from './path_helper.ts'
import type {
  CallExpression,
  ExpressionStatement,
  Program,
  Node,
  FunctionExpression,
  BlockStatement,
} from 'estree'

export function transpile(
  code: string,
  buildDestFilePath: string,
  cypressFilePath: string,
): string {
  console.log('Transpiling...')
  const astSource: Program = getAst(code)
  let ast: Program = structuredClone(astSource)
  edit(ast, moveDescribeItToTopLevel)
  edit(ast, renameHooks)
  edit(ast, removeLucioleImport)
  edit(ast, (node) =>
    editImportsPaths(node, buildDestFilePath, cypressFilePath),
  )
  edit(ast, removeToList)
  edit(ast, convertArrowFunToAnonymousFun)
  edit(ast, removeReturns)
  return generateCode(ast)
}

function getAst(code: string): Program {
  const ast = espree.parse(code, {
    ecmaVersion: 'latest',
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
    },
  }) as Program
  return ast
}

function generateCode(ast: Program): string {
  return escodegen.generate(ast)
}

function isItExpression(expr: any): expr is CallExpression {
  return (
    expr.type === 'CallExpression' &&
    expr.callee.type === 'Identifier' &&
    expr.callee.name === 'it'
  )
}

function isDescribeExpression(expr: any): expr is CallExpression {
  return (
    expr.type === 'CallExpression' &&
    expr.callee.type === 'Identifier' &&
    expr.callee.name === 'describe'
  )
}

function isHookExpression(expr: any): expr is CallExpression {
  return (
    expr.type === 'CallExpression' &&
    expr.callee.type === 'Identifier' &&
    (expr.callee.name === 'beforeEach' ||
      expr.callee.name === 'afterEach' ||
      expr.callee.name === 'before' ||
      expr.callee.name === 'after')
  )
}

function edit(
  ast: Program,
  fn: (node: Node) => Node | undefined | estraverse.VisitorOption,
) {
  const newAst = estraverse.replace(ast, {
    enter(node) {
      return fn(node)
    },
  })
}

/**
 * Move a describe node to top-level in a function whose name ends in "_cy".
 * Only the first describe node of the function is moved to top-level
 * while other nodes of the function are removed.
 */
function moveDescribeItToTopLevel(
  node: Node,
): Node | undefined | estraverse.VisitorOption {
  if (
    node.type === 'ExportNamedDeclaration' &&
    node.declaration?.type === 'FunctionDeclaration' &&
    node.declaration?.id.name.endsWith('_cy')
  ) {
    const functionBody = node.declaration?.body.body
    for (const statement of functionBody) {
      if (
        statement.type === 'ReturnStatement' &&
        statement.argument?.type === 'CallExpression' &&
        statement.argument.callee.type === 'Identifier' &&
        (statement.argument.callee.name === 'describe' ||
          statement.argument.callee.name === 'it')
      ) {
        const newNode: ExpressionStatement = {
          type: 'ExpressionStatement',
          expression: statement.argument,
        }
        return newNode
      }
    }
  }
}

/**
 * Rename after_each and before_each hooks to their camel case equivalent.
 */
function renameHooks(node: Node): Node | undefined | estraverse.VisitorOption {
  if (
    node.type === 'CallExpression' &&
    node.callee.type === 'Identifier' &&
    (node.callee.name === 'before_each' || node.callee.name === 'after_each')
  ) {
    node.callee.name = camelize(node.callee.name)
    return node
  }
}

function camelize(str: string) {
  return str.toLowerCase().replace(/[^a-zA-Z0-9]+(.)/g, function (_, chr) {
    return chr.toUpperCase()
  })
}

/**
 * Remove the import of luciole package.
 */
function removeLucioleImport(
  node: Node,
): Node | undefined | estraverse.VisitorOption {
  if (
    node.type === 'ImportDeclaration' &&
    typeof node.source.value === 'string' &&
    node.source.value.endsWith('luciole.mjs')
  ) {
    return estraverse.VisitorOption.Remove
  }
}

/**
 * Edit the path of imported packages to match the location of the build destination path.
 */
function editImportsPaths(
  node: Node,
  buildDestFilePath: string,
  cypressFilePath: string,
): Node | undefined | estraverse.VisitorOption {
  if (
    node.type === 'ImportDeclaration' &&
    typeof node.source.value === 'string' &&
    node.source.value.length > 0
  ) {
    let srcImportPath: string = node.source.value
    let newAbsoluteImportPath: string = path.resolve(
      buildDestFilePath,
      '..',
      srcImportPath,
    )
    let newImportPath: string = path.relative(
      cypressFilePath,
      newAbsoluteImportPath,
    )
    newImportPath = removeFirstPartOfPath(newImportPath) // should remove "../"
    if (srcImportPath.charAt(0) !== '/') {
      srcImportPath = '.' + path.sep + newImportPath
    } else {
      srcImportPath = newAbsoluteImportPath
    }
    node.source.value = srcImportPath
    node.source.raw = `"${srcImportPath}"`
    return node
  }
}

/**
 * Turn `toList([...])` into `[...]` at top-level of `describe` blocks.
 */
function removeToList(node: Node): Node | undefined | estraverse.VisitorOption {
  if (
    node.type === 'ExpressionStatement' &&
    isDescribeExpression(node.expression)
  ) {
    const args = node.expression.arguments
    if (
      args[1] !== undefined &&
      args[1].type === 'CallExpression' &&
      args[1].callee.type === 'Identifier' &&
      args[1].callee.name === 'toList'
    ) {
      const list = args[1].arguments[0] ?? []
      node.expression.arguments[1] = list
      return node
    }
  }
}

/**
 * Convert arrow functions to anonymous functions in `it` blocks.
 */
function convertArrowFunToAnonymousFun(
  node: Node,
): Node | undefined | estraverse.VisitorOption {
  if (
    (isItExpression(node) || isHookExpression(node)) &&
    node.arguments[1] !== undefined &&
    node.arguments[1].type === 'ArrowFunctionExpression' &&
    node.arguments[1].body.type === 'BlockStatement'
  ) {
    const body: BlockStatement = node.arguments[1].body
    const anonymousFunction: FunctionExpression = {
      type: 'FunctionExpression',
      params: [],
      body: body,
    }
    node.arguments[1] = anonymousFunction
    return node
  }
}

/**
 * Convert return expressions to simple expressions in `it` blocks.
 */
function removeReturns(
  node: Node,
): Node | undefined | estraverse.VisitorOption {
  if (isItExpression(node) && node.arguments[1].type === 'FunctionExpression') {
    const itBody = node.arguments[1].body
    for (let i = 0; i < itBody.body.length; i++) {
      const expr = itBody.body[i]
      if (expr.type === 'ReturnStatement' && expr.argument) {
        const exprNotReturn: ExpressionStatement = {
          type: 'ExpressionStatement',
          expression: expr.argument,
        }
        itBody.body[i] = exprNotReturn
        return node
      }
    }
  }
}
