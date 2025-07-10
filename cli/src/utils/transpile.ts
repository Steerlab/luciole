import * as path from 'path'
import * as espree from 'espree'
import * as escodegen from 'escodegen'
import * as estraverse from 'estraverse'
import type { CallExpression, ExpressionStatement, Program, Node } from 'estree'

export function transpile(
  code: string,
  buildDestinationPath: string,
  testPath: string,
): string {
  console.log('Transpiling...')
  const astSource: Program = getAst(code)
  let ast: Program = structuredClone(astSource)
  edit(ast, moveDescribeToTopLevel)
  edit(ast, removeLucioleImport)
  ast = editImportsPath(ast, buildDestinationPath, testPath)
  ast = removeToList(ast)
  ast = convertArrowFunToAnonymousFun(ast)
  ast = removeReturns(ast)
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
    expr != null &&
    expr.type === 'CallExpression' &&
    expr.callee.type === 'Identifier' &&
    expr.callee.name === 'it'
  )
}

function isDescribeExpression(expr: any): expr is CallExpression {
  return (
    expr != null &&
    expr.type === 'CallExpression' &&
    expr.callee.type === 'Identifier' &&
    expr.callee.name === 'describe'
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
 * Move a describe node to top-level in a function whose name ends in "_test".
 * Only the first describe node of the function is moved to top-level
 * while other nodes of the function are removed.
 */
function moveDescribeToTopLevel(
  node: Node,
): Node | undefined | estraverse.VisitorOption {
  if (
    node.type === 'ExportNamedDeclaration' &&
    node.declaration?.type === 'FunctionDeclaration' &&
    node.declaration?.id.name.endsWith('_test')
  ) {
    const functionBody = node.declaration?.body.body
    for (const statement of functionBody) {
      if (
        statement.type === 'ReturnStatement' &&
        statement.argument?.type === 'CallExpression' &&
        statement.argument.callee.type === 'Identifier' &&
        statement.argument.callee.name === 'describe'
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
 * Remove the import of luciole package.
 */
function removeLucioleImport(
  node: Node,
): Node | undefined | estraverse.VisitorOption {
  if (
    node.type === 'ImportDeclaration' &&
    node.source.value === './luciole.mjs'
  ) {
    return estraverse.VisitorOption.Remove
  }
}

function editImportsPath(
  ast: Program,
  buildDestinationPath: string,
  testPath: string,
): Program {
  const importRelativePath = `${path.relative(testPath, buildDestinationPath)}/build/dev/javascript/luciole/`
  const newBody: typeof ast.body = []
  for (const node of ast.body) {
    if (node.type === 'ImportDeclaration') {
      let importPath: string = String(node.source.value) ?? ''
      if (importPath.slice(0, 2) === './') {
        importPath = importRelativePath + importPath.slice(2)
      } else if (importPath.charAt(0) !== '/') {
        importPath = importRelativePath + importPath
      }
      const newNode = structuredClone(node)
      newNode.source.value = importPath
      newNode.source.raw = `"${importPath}"`
      newBody.push(newNode)
      continue
    }
    newBody.push(structuredClone(node))
  }
  return {
    type: 'Program',
    body: newBody,
    sourceType: ast.sourceType,
  }
}

function removeToList(ast: Program): Program {
  const newBody: typeof ast.body = []
  for (const original of ast.body) {
    const node = structuredClone(original)
    if (
      node.type === 'ExpressionStatement' &&
      isDescribeExpression(node.expression)
    ) {
      const args = node.expression.arguments
      if (args[1].type === 'CallExpression') {
        const list = structuredClone(args[1].arguments[0])
        node.expression.arguments[1] = list
        newBody.push(node)
        continue
      }
    }
    newBody.push(structuredClone(node))
  }
  return {
    type: 'Program',
    body: newBody,
    sourceType: ast.sourceType,
  }
}

function convertArrowFunToAnonymousFun(ast: Program): Program {
  const newBody: typeof ast.body = []
  outerLoop: for (const node of ast.body) {
    const newNode = structuredClone(node)
    if (
      node.type === 'ExpressionStatement' &&
      newNode.type === 'ExpressionStatement' &&
      isDescribeExpression(node.expression) &&
      isDescribeExpression(newNode.expression)
    ) {
      const args = node.expression.arguments
      const newArgs = newNode.expression.arguments
      if (
        args[1].type === 'ArrayExpression' &&
        newArgs[1].type === 'ArrayExpression'
      ) {
        for (const newCall of newArgs[1].elements) {
          if (isItExpression(newCall)) {
            newCall.arguments[1].type = 'FunctionExpression'
            newBody.push(newNode)
            continue outerLoop
          }
        }
      }
    }
    newBody.push(structuredClone(node))
  }
  return {
    type: 'Program',
    body: newBody,
    sourceType: ast.sourceType,
  }
}

function removeReturns(ast: Program): Program {
  const newBody: typeof ast.body = []
  outerLoop: for (const node of ast.body) {
    const newNode = structuredClone(node)
    if (
      node.type === 'ExpressionStatement' &&
      newNode.type === 'ExpressionStatement' &&
      isDescribeExpression(node.expression) &&
      isDescribeExpression(newNode.expression)
    ) {
      const args = node.expression.arguments
      const newArgs = newNode.expression.arguments
      if (
        args[1].type === 'ArrayExpression' &&
        newArgs[1].type === 'ArrayExpression'
      ) {
        for (const newCall of newArgs[1].elements) {
          if (
            isItExpression(newCall) &&
            newCall.arguments[1].type === 'FunctionExpression'
          ) {
            const newItBody = newCall.arguments[1].body
            for (let i = 0; i < newItBody.body.length; i++) {
              const newItExpr = newItBody.body[i]
              if (newItExpr.type === 'ReturnStatement' && newItExpr.argument) {
                const newNotReturn: ExpressionStatement = {
                  type: 'ExpressionStatement',
                  expression: newItExpr.argument,
                }
                newItBody.body[i] = newNotReturn
              }
            }
            newBody.push(newNode)
            continue outerLoop
          }
        }
      }
    }
    newBody.push(structuredClone(node))
  }
  return {
    type: 'Program',
    body: newBody,
    sourceType: ast.sourceType,
  }
}
