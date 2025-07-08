import * as espree from 'espree'
import * as escodegen from 'escodegen'
import {
  ArrayExpression,
  CallExpression,
  ExpressionStatement,
  Program,
} from 'estree'
import path from 'path'

export function transpile(
  code: string,
  buildDestinationPath: string,
  testPath: string,
): string {
  console.log('Transpiling...')
  let ast: Program = get_ast(code)
  ast = move_describe_at_root(ast)
  ast = remove_describe_it_imports(ast)
  ast = edit_imports_path(ast, buildDestinationPath, testPath)
  ast = remove_to_list(ast)
  ast = convert_arrow_fun_to_anonymous_fun(ast)
  ast = remove_returns(ast)
  return generate_code(ast)
}

function get_ast(code: string): Program {
  const ast = espree.parse(code, {
    ecmaVersion: 'latest',
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
    },
  }) as Program
  return ast
}

function generate_code(ast: Program): string {
  return escodegen.generate(ast)
}

function is_it_expression(expr: any): expr is CallExpression {
  return (
    expr != null &&
    expr.type === 'CallExpression' &&
    expr.callee.type === 'Identifier' &&
    expr.callee.name === 'it'
  )
}

function is_describe_expression(expr: any): expr is CallExpression {
  return (
    expr != null &&
    expr.type === 'CallExpression' &&
    expr.callee.type === 'Identifier' &&
    expr.callee.name === 'describe'
  )
}

function clone<A>(a: A): A {
  return structuredClone(a)
}

function move_describe_at_root(ast: Program): Program {
  const newBody: typeof ast.body = []

  outerLoop: for (const node of ast.body) {
    if (
      node.type === 'ExportNamedDeclaration' &&
      node.declaration?.type === 'FunctionDeclaration' &&
      node.declaration?.id.name.endsWith('_test')
    ) {
      const function_body = node.declaration?.body.body

      for (const statement of function_body) {
        if (
          statement.type === 'ReturnStatement' &&
          statement.argument?.type === 'CallExpression'
        ) {
          const call_expression = statement.argument
          const newNode: ExpressionStatement = {
            type: 'ExpressionStatement',
            expression: call_expression,
          }

          newBody.push(newNode)
          continue outerLoop
        }
      }
    }
    newBody.push(clone(node))
  }
  return {
    type: 'Program',
    body: newBody,
    sourceType: ast.sourceType,
  }
}

function remove_describe_it_imports(ast: Program): Program {
  const newBody: typeof ast.body = []
  for (const node of ast.body) {
    if (
      node.type === 'ImportDeclaration' &&
      node.source.value === './luciole.mjs'
    ) {
      continue
    }
    newBody.push(clone(node))
  }
  return {
    type: 'Program',
    body: newBody,
    sourceType: ast.sourceType,
  }
}

function edit_imports_path(
  ast: Program,
  buildDestinationPath: string,
  testPath: string,
): Program {
  const import_relative_path = `${path.relative(testPath, buildDestinationPath)}/build/dev/javascript/luciole/`
  const newBody: typeof ast.body = []
  for (const node of ast.body) {
    if (node.type === 'ImportDeclaration') {
      let import_path: string = String(node.source.value) ?? ''
      if (import_path.slice(0, 2) === './') {
        import_path = import_relative_path + import_path.slice(2)
      } else if (import_path.charAt(0) !== '/') {
        import_path = import_relative_path + import_path
      }
      const newNode = clone(node)
      newNode.source.value = import_path
      newNode.source.raw = `"${import_path}"`
      newBody.push(newNode)
      continue
    }
    newBody.push(clone(node))
  }
  return {
    type: 'Program',
    body: newBody,
    sourceType: ast.sourceType,
  }
}

function remove_to_list(ast: Program): Program {
  const newBody: typeof ast.body = []
  for (const node of ast.body) {
    const newNode = clone(node)
    if (
      node.type === 'ExpressionStatement' &&
      newNode.type === 'ExpressionStatement' &&
      is_describe_expression(node.expression) &&
      is_describe_expression(newNode.expression)
    ) {
      const args = node.expression.arguments
      if (args[1].type === 'CallExpression') {
        const list = clone(args[1].arguments[0])
        newNode.expression.arguments[1] = list
        newBody.push(newNode)
        continue
      }
    }
    newBody.push(clone(node))
  }
  return {
    type: 'Program',
    body: newBody,
    sourceType: ast.sourceType,
  }
}

function convert_arrow_fun_to_anonymous_fun(ast: Program): Program {
  const newBody: typeof ast.body = []
  outerLoop: for (const node of ast.body) {
    const newNode = clone(node)
    if (
      node.type === 'ExpressionStatement' &&
      newNode.type === 'ExpressionStatement' &&
      is_describe_expression(node.expression) &&
      is_describe_expression(newNode.expression)
    ) {
      const args = node.expression.arguments
      const newArgs = newNode.expression.arguments
      if (
        args[1].type === 'ArrayExpression' &&
        newArgs[1].type === 'ArrayExpression'
      ) {
        for (const newCall of newArgs[1].elements) {
          if (is_it_expression(newCall)) {
            newCall.arguments[1].type = 'FunctionExpression'
            newBody.push(newNode)
            continue outerLoop
          }
        }
      }
    }
    newBody.push(clone(node))
  }
  return {
    type: 'Program',
    body: newBody,
    sourceType: ast.sourceType,
  }
}

function remove_returns(ast: Program): Program {
  const newBody: typeof ast.body = []
  outerLoop: for (const node of ast.body) {
    const newNode = clone(node)
    if (
      node.type === 'ExpressionStatement' &&
      newNode.type === 'ExpressionStatement' &&
      is_describe_expression(node.expression) &&
      is_describe_expression(newNode.expression)
    ) {
      const args = node.expression.arguments
      const newArgs = newNode.expression.arguments
      if (
        args[1].type === 'ArrayExpression' &&
        newArgs[1].type === 'ArrayExpression'
      ) {
        for (const newCall of newArgs[1].elements) {
          if (
            is_it_expression(newCall) &&
            newCall.arguments[1].type === 'FunctionExpression'
          ) {
            const newItBody = newCall.arguments[1].body
            for (let i = 0; i < newItBody.body.length; i++) {
              const newItExpr = newItBody.body[i]
              if (newItExpr.type === 'ReturnStatement') {
                const newNotReturn = {
                  type: 'ExpressionStatement',
                  expression: newItExpr.argument,
                } as ExpressionStatement
                newItBody.body[i] = newNotReturn
              }
            }
            newBody.push(newNode)
            continue outerLoop
          }
        }
      }
    }
    newBody.push(clone(node))
  }
  return {
    type: 'Program',
    body: newBody,
    sourceType: ast.sourceType,
  }
}
