import * as espree from 'espree'
import * as escodegen from 'escodegen'
import { ExpressionStatement, Program } from 'estree'

export function transpile(code: string): string {
  console.log('Transpiling...')
  let ast: Program = get_ast(code)
  ast = move_describe_at_root(ast)
  ast = remove_describe_it_imports(ast)
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
          replaced = true
        }
      }
    }

    if (!replaced) {
      newBody.push(structuredClone(node))
    }
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
    newBody.push(structuredClone(node))
  }
  return {
    type: 'Program',
    body: newBody,
    sourceType: ast.sourceType,
  }
}
