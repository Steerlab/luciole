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
    if (node.type === 'ExpressionStatement') {
      console.log('\nExpressionStatements:')
      console.dir(node.expression)
    }
  }
}
