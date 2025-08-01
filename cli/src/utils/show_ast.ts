import * as fs from 'fs'
import * as path from 'path'
import * as espree from 'espree'
import * as estraverse from 'estraverse'
import type { Program, Node } from 'estree'

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
  console.log(JSON.stringify(ast))
  // let depth = 0
  // estraverse.traverse(ast, {
  //   enter(node) {
  //     const indent = '| '.repeat(depth)
  //     const description = getNodeDescription(node)
  //     console.log(`${indent}${node.type} (${depth})${description}`)
  //     depth++
  //   },
  //   leave() {
  //     depth--
  //   },
  // })
}

function getNodeDescription(node: Node): string {
  switch (node.type) {
    case 'Identifier':
      return `: ${node.name}`
    case 'Literal':
      return `: ${JSON.stringify(node.value)}`
    case 'TemplateElement':
      return `: ${JSON.stringify(node.value.raw)}`
    case 'BinaryExpression':
    case 'LogicalExpression':
      return `: ${node.operator}`
    case 'MemberExpression':
      return `: ${node.computed ? '[computed]' : ''}`
    case 'VariableDeclarator':
      return node.id && (node.id as any).name
        ? `: ${(node.id as any).name}`
        : ''
    default:
      return ''
  }
}
