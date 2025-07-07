import * as io from './utils/io'
import { show_ast } from './utils/show_ast'
import * as transpile from './utils/transpile'
import { Command } from 'commander'

const program = new Command()

program
  .command('transpile')
  .description(
    'Creates an AST from a JavaScript file, parse it and generate the resulting code.',
  )
  .argument('<gleam-path>', 'Path to gleam project.')
  .argument('<build-destination-path>', 'Destination path for build files.')
  .argument('<test-path>', 'Destination path to Cypress test file.')
  .action((gleamPath, buildDestinationPath, testPath) => {
    main(gleamPath, buildDestinationPath, testPath)
  })

program
  .command('show_ast')
  .description('Show AST (Abstract Syntaxic Tree) components.')
  .argument('<ts-path>', 'Path to TypeScript file.')
  .action((tsPath) => {
    show_ast(tsPath)
  })

program.parse(process.argv)

function main(
  gleamPath: string,
  buildDestinationPath: string,
  testPath: string,
) {
  io.compile_gleam(gleamPath)
  io.copy_gleam_build(gleamPath, buildDestinationPath)
  let testCode: string = io.read_test(buildDestinationPath)
  testCode = transpile.transpile(testCode, buildDestinationPath, testPath)
  io.write_test(testCode, testPath)
  io.format_test(testPath)
  console.log('Done.')
}
