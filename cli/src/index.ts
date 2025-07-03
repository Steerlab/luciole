import path from 'path'
import * as io from './utils/io'
import * as transpile from './utils/transpile'
import { Command } from 'commander'

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
    main(gleamPath, buildDestinationPath, testPath)
  })

program.parse(process.argv)

function main(
  gleamPath: string,
  buildDestinationPath: string,
  testPath: string,
) {
  io.compile_gleam(gleamPath)
  io.copy_gleam_build(gleamPath, buildDestinationPath)
  const testCode: string = io.read_test(buildDestinationPath)
  const testCodeTranspiled = transpile.transpile(
    testCode,
    buildDestinationPath,
    testPath,
  )
  console.log(testCodeTranspiled)
  io.write_test(testCodeTranspiled, testPath)
  console.log('Done.')
}
