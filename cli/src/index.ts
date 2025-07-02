import { Command } from 'commander'
import * as fs from 'fs'
import * as espree from 'espree'
import { ExpressionStatement, Program } from 'estree'
import * as escodegen from 'escodegen'
import * as path from 'path'

const program = new Command()
const execSync = require('child_process').execSync

program
  .name('my-cli')
  .description('CLI for compiling Gleam tests to Cypress tests. ')
  .version('1.0.0')

program
  .command('hello')
  .description('Prints Hello World. ')
  .action(() => {
    console.log('Hello, world!')
  })

program
  .command('gleam-build')
  .description('Compiles Gleam files to JavaScript. ')
  .action(() => {
    compile_gleam()
  })

program
  .command('transpile')
  .description(
    'Creates an AST from a JavaScript file, parse it and generate the resulting code. ',
  )
  .action(() => {
    transpile_js('../gleam/build/dev/javascript/luciole/describe_test.mjs')
    // transpile_js("../ignore/example_api_2.cy.mjs");
    // transpile_js("./tmp.mjs");
  })

function compile_gleam() {
  const output = execSync('gleam build --target=js', {
    encoding: 'utf-8',
    cwd: './../gleam/',
  })
}

function transpile_js(filepath: string) {
  const ast = get_ast(filepath)
  const parsed_ast = parse_ast(ast)
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

function parse_ast(ast: Program): Program {
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

program.parse(process.argv)
