import * as io from './utils/io'
import * as transpile from './utils/transpile'
import { Command } from 'commander'

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
  io.compile_gleam(args.gleamPath)
  io.copy_gleam_build(args.gleamPath, args.buildDestinationPath)
  const test_code: string = io.read_test(args.buildDestinationPath)
  const test_code_transpiled = transpile.transpile(test_code)
  console.log(test_code_transpiled)
  io.write_test(test_code_transpiled, args.testPath)
  console.log('Done.')
}
