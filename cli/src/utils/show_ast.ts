import fs from 'fs'
import * as espree from 'espree'
import { Program } from 'estree'
import path from 'path'

export function show_ast(filepath: string) {
  console.log('TEST')
  const absolutePath = path.resolve(filepath)
  const code = fs.readFileSync(absolutePath, 'utf-8')
  const ast = espree.parse(code, {
    ecmaVersion: 'latest',
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
    },
  }) as Program
  console.log('AST:')
  console.dir(ast)
  for (const node of ast.body) {
    if (
      node.type === 'ExpressionStatement' &&
      node.expression.type === 'CallExpression' &&
      node.expression.callee.type === 'Identifier' &&
      node.expression.callee.name === 'describe'
    ) {
      console.log('\nExpressionStatements:')
      console.dir(node.expression)
      const args = node.expression.arguments
      console.dir(args)
      if (args[1].type === 'ArrayExpression') {
        console.dir(args[1])
        for (const call of args[1].elements) {
          if (call != null && call.type === 'CallExpression') {
            console.dir(call.callee)
            console.dir(call.arguments)
          }
        }
      }
    }
  }
}
