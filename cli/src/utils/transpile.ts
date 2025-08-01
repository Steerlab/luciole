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
  Identifier,
} from 'estree'

export function transpile(
  code: string,
  buildDestFilePath: string,
  cypressFilePath: string,
): string {
  console.log('Transpiling...')
  const astSource: Program = getAst(code)
  let ast: Program = structuredClone(astSource)

  const moduleAliases: string[] = []
  const funAliases: Record<string, string> = {}

  edit(ast, (node) => removeLucioleImports(node, moduleAliases, funAliases))
  edit(ast, (node) => removeLucioleAliases(node, moduleAliases, funAliases))
  edit(ast, moveDescribeItToTopLevel)
  edit(ast, renameHooks)
  edit(ast, editTestInclusion)
  edit(ast, (node) =>
    editImportsPaths(node, buildDestFilePath, cypressFilePath),
  )
  edit(ast, editDescribeList)
  edit(ast, convertItArrowFunToAnonymousFun)
  edit(ast, removeReturns)
  return generateCode(ast)
}

function generateCode(ast: Program): string {
  return escodegen.generate(ast)
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

function edit(
  ast: Program,
  fn: (node: Node) => Node | undefined | estraverse.VisitorOption,
) {
  estraverse.replace(ast, {
    enter(node) {
      return fn(node)
    },
  })
}

type DescribeOrIt = 'describe' | 'it' | 'any'
type InclusionOption = 'enable' | 'skip' | 'only' | 'any'

function isBlockExpression(
  expr: any,
  describeOrIt: DescribeOrIt,
  inclusionOption: InclusionOption,
): expr is CallExpression {
  switch (inclusionOption) {
    case 'skip':
    case 'only':
      return (
        expr.type === 'CallExpression' &&
        expr.callee.type === 'MemberExpression' &&
        expr.callee.object.type === 'Identifier' &&
        checkBlockName(expr.callee.object.name, describeOrIt) &&
        expr.callee.property.type === 'Identifier' &&
        expr.callee.property.name === inclusionOption
      )
    case 'enable':
      return (
        expr.type === 'CallExpression' &&
        expr.callee.type === 'Identifier' &&
        checkBlockName(expr.callee.name, describeOrIt)
      )
    case 'any':
      return (
        (expr.type === 'CallExpression' &&
          expr.callee.type === 'MemberExpression' &&
          expr.callee.object.type === 'Identifier' &&
          checkBlockName(expr.callee.object.name, describeOrIt) &&
          expr.callee.property.type === 'Identifier' &&
          ['enable', 'skip', 'only'].includes(expr.callee.property.name)) ||
        (expr.type === 'CallExpression' &&
          expr.callee.type === 'Identifier' &&
          checkBlockName(expr.callee.name, describeOrIt))
      )
    default:
      return false
  }
}

function checkBlockName(name: string, describeOrIt: DescribeOrIt) {
  switch (describeOrIt) {
    case 'describe':
    case 'it':
      return name === describeOrIt
    case 'any':
      return name === 'describe' || name === 'it'
    default:
      return false
  }
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

/**
 * Remove imports of the luciole package.
 * Put the module aliases in the given list.
 * Put the functions aliases in the given record.
 */
function removeLucioleImports(
  node: Node,
  moduleAliases: string[],
  funAliases: Record<string, string>,
): Node | undefined | estraverse.VisitorOption {
  if (
    node.type === 'ImportDeclaration' &&
    typeof node.source.value === 'string' &&
    node.source.value.endsWith(path.join(path.sep, 'luciole.mjs'))
  ) {
    node.specifiers.forEach((specifier) => {
      if (specifier.type === 'ImportNamespaceSpecifier') {
        const alias = specifier.local.name
        if (!moduleAliases.includes(alias)) moduleAliases.push(alias)
      }
      if (
        specifier.type === 'ImportSpecifier' &&
        specifier.imported.type === 'Identifier'
      ) {
        const imported_name = specifier.imported.name
        const local_name = specifier.local.name
        if (imported_name !== local_name) {
          funAliases[local_name] = imported_name
        }
      }
    })
    return estraverse.VisitorOption.Remove
  }
}

/**
 * This function removes Luciole module aliases and
 * replaces Luciole base module's function aliases by their corresponding name.
 */
function removeLucioleAliases(
  node: Node,
  moduleAliases: string[],
  funAliases: Record<string, string>,
): Node | undefined | estraverse.VisitorOption {
  if (
    node.type === 'CallExpression' &&
    node.callee.type === 'MemberExpression' &&
    node.callee.object.type === 'Identifier' &&
    node.callee.property.type === 'Identifier' &&
    moduleAliases.includes(node.callee.object.name)
  ) {
    const funName = node.callee.property.name
    const newExpression: Identifier = {
      type: 'Identifier',
      name: funName,
    }
    node.callee = newExpression
    return removeLucioleFunAliases(node, funAliases)
  }
  return removeLucioleFunAliases(node, funAliases)
}

function removeLucioleFunAliases(
  node: Node,
  funAliases: Record<string, string>,
): Node | undefined | estraverse.VisitorOption {
  if (
    node.type === 'CallExpression' &&
    node.callee.type === 'Identifier' &&
    funAliases[node.callee.name] !== undefined
  ) {
    node.callee.name = funAliases[node.callee.name]
    return node
  }
}

/**
 * Move a describe node to top-level in a function whose name ends in "_cy".
 * Only the first describe node of the function is moved to top-level
 * while other nodes of the function are removed.
 */
function moveDescribeItToTopLevel(
  node: Node,
): Node | undefined | estraverse.VisitorOption {
  const topLevelNames = [
    'describe',
    'it',
    'describe_only',
    'describe_skip',
    'it_only',
    'it_skip',
  ]
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
        topLevelNames.includes(statement.argument.callee.name)
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
 * Change it_skip() to it.skip(), and similarly for it_only(), describe_only() and describe_skip().
 */
function editTestInclusion(
  node: Node,
): Node | undefined | estraverse.VisitorOption {
  const testInclusionNames = [
    'it_only',
    'it_skip',
    'describe_only',
    'describe_skip',
  ]
  if (
    node.type === 'CallExpression' &&
    node.callee.type === 'Identifier' &&
    testInclusionNames.includes(node.callee.name)
  ) {
    const identifiers = node.callee.name.split('_')
    node.callee = {
      type: 'MemberExpression',
      object: { type: 'Identifier', name: identifiers[0] },
      property: { type: 'Identifier', name: identifiers[1] },
      computed: false,
      optional: false,
    }
    return node
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
 * Turn `describe("bla", toList([x, y]))` into `describe("bla", function { x; y })`.
 */
function editDescribeList(
  node: Node,
): Node | undefined | estraverse.VisitorOption {
  if (
    node.type === 'ExpressionStatement' &&
    isBlockExpression(node.expression, 'describe', 'any')
  ) {
    const args = node.expression.arguments
    if (
      args[1] !== undefined &&
      args[1].type === 'CallExpression' &&
      args[1].callee.type === 'Identifier' &&
      args[1].callee.name === 'toList' &&
      Array.isArray(args[1].arguments) &&
      args[1].arguments.length > 0 &&
      args[1].arguments[0].type === 'ArrayExpression' &&
      args[1].arguments[0].elements.length > 0 &&
      args[1].arguments[0].elements[0]?.type === 'CallExpression'
    ) {
      const calls = args[1].arguments[0].elements
      const exprs: ExpressionStatement[] = []
      for (let i = 0; i < calls.length; i++) {
        const ci = calls[i]
        if (ci?.type === 'CallExpression') {
          const expr: ExpressionStatement = {
            type: 'ExpressionStatement',
            expression: ci,
          }
          exprs.push(expr)
        }
      }

      const funExpr: FunctionExpression = {
        type: 'FunctionExpression',
        params: [],
        body: {
          type: 'BlockStatement',
          body: exprs,
        },
      }
      node.expression.arguments[1] = funExpr
      return node
    }
  }
}

/**
 * Convert arrow functions to anonymous functions in `it` blocks.
 */
function convertItArrowFunToAnonymousFun(
  node: Node,
): Node | undefined | estraverse.VisitorOption {
  if (
    (isBlockExpression(node, 'it', 'any') || isHookExpression(node)) &&
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
  if (
    isBlockExpression(node, 'it', 'any') &&
    node.arguments[1].type === 'FunctionExpression'
  ) {
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
