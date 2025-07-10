import * as fs from 'fs'
import * as path from 'path'
import * as espree from 'espree'
import * as estraverse from 'estraverse'
import type { Program } from 'estree'

export function showAST(filepath: string) {
  const absolutePath = path.resolve(filepath)
  const code = fs.readFileSync(absolutePath, 'utf-8')
  const ast = espree.parse(code, {
    ecmaVersion: 'latest',
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
    },
  }) as Program
  let depth = 0
  estraverse.traverse(ast, {
    enter(node) {
      console.log('| '.repeat(depth) + `${node.type} (${depth})`)
      depth++
    },
    leave() {
      depth--
    },
  })
}
