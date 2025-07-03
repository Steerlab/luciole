import * as espree from 'espree'
import * as escodegen from 'escodegen'
import { ExpressionStatement, Program } from 'estree'

export function transpile(code: string): string {
  console.log('Transpiling...')
  let ast: Program = get_ast(code)
  ast = move_describe_at_root(ast)
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
  const code = escodegen.generate(ast)
  return code
}

function move_describe_at_root(ast: Program): Program {
  const newBody: typeof ast.body = []

  for (const node of ast.body) {
    let replaced = false
    console.dir(node)
    if (
      node.type === 'ExportNamedDeclaration' &&
      node.declaration?.type === 'FunctionDeclaration' &&
      node.declaration?.id.name.endsWith('_test')
    ) {
      const function_body = node.declaration?.body.body
      console.log('FOUND :D')
      console.dir(function_body)

      for (const statement of function_body) {
        if (
          statement.type === 'ReturnStatement' &&
          statement.argument?.type === 'CallExpression'
        ) {
          const call_expression = statement.argument
          console.log('YES')
          console.dir(call_expression)

          const newNode: ExpressionStatement = {
            type: 'ExpressionStatement',
            expression: call_expression,
          }

          newBody.push(newNode)
          console.log('REPLACED !')
          replaced = true
        }
      }
    }

    if (!replaced) {
      console.log('KEEP\n')
      newBody.push(structuredClone(node))
    }
  }

  return {
    type: 'Program',
    body: newBody,
    sourceType: ast.sourceType,
  }
}
