import { Command } from 'commander'
import * as fs from 'fs'
import * as espree from 'espree'
import { ExpressionStatement, Program } from 'estree'
import * as escodegen from 'escodegen'
import * as path from 'path'
import {
  compile_gleam,
  copy_gleam_build,
  read_test,
  write_test,
} from './utils/io'
import { transpile } from './utils/transpile'

interface CLIArgs {
  gleamPath: string
  buildDestinationPath: string
  testPath: string
}

const program = new Command()

program
  .command('transpile')
  .description(
    'Creates an AST from a JavaScript file, parse it and generate the resulting code. ',
  )
  .argument('<gleam-path>', 'test')
  .argument('<build-destination-path>', 'test')
  .argument('<test-path>', 'test')
  .action((gleamPath, buildDestinationPath, testPath) => {
    const args: CLIArgs = { gleamPath, buildDestinationPath, testPath }
    main(args)
  })

program.parse(process.argv)

function main(args: CLIArgs) {
  compile_gleam(args.gleamPath)
  copy_gleam_build(args.gleamPath, args.buildDestinationPath)
  let test_code: string = read_test(args.buildDestinationPath)
  test_code = transpile(test_code)
  write_test(test_code, args.testPath)
  console.log('Done.')
}

function transpile_js(filepath: string) {
  const ast = get_ast(filepath)
  const parsed_ast = ast_move_describe_at_root(ast)
  generate_code(parsed_ast)
}

function get_ast(filepath: string): Program {
  const absolutePath = path.resolve(filepath)
  const code = fs.readFileSync(absolutePath, 'utf-8')

  const ast = espree.parse(code, {
    ecmaVersion: 'latest',
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
    },
  }) as Program

  return ast
}

function ast_move_describe_at_root(ast: Program): Program {
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
      // Si ce n'est pas une fonction cible, on la conserve
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

function generate_code(ast: Program) {
  // console.dir(ast, { depth: null, colors: true });
  const cypress_code = escodegen.generate(ast)
  console.log(cypress_code)
}
