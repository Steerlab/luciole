import * as io from './utils/io.ts'
import { showAST } from './utils/show_ast.ts'
import * as transpile from './utils/transpile.ts'
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
  .command('show-ast')
  .description('Show AST (Abstract Syntaxic Tree) components.')
  .argument('<ts-path>', 'Path to TypeScript file.')
  .action((tsPath) => {
    showAST(tsPath)
  })

program.parse(process.argv)

async function main(
  gleamPath: string,
  buildDestinationPath: string,
  testPath: string,
) {
  io.compileGleam(gleamPath)
  io.copyGleamBuild(gleamPath, buildDestinationPath)
  let testCode: string = await io.readTest(buildDestinationPath)
  testCode = transpile.transpile(testCode, buildDestinationPath, testPath)
  await io.writeTest(testCode, testPath)
  io.formatTest(testPath)
  console.log('Done.')
}
