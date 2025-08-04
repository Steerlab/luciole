import * as fs from 'node:fs'
import * as io from './utils/io.ts'
import * as path from 'node:path'
import * as transpile from './utils/transpile.ts'
import { Command } from 'commander'
import { showAST } from './utils/show_ast.ts'
import { setExtensionTo } from './utils/path_helper.ts'

const program = new Command()

program
  .command('transpile')
  .description(
    'Compiles to JavaScript test files formatted with Luciole, parse and edit their AST to follow Cypress conventions, and generate the resulting code in Cypress-compatible files.',
  )
  .argument(
    '<gleam-src>',
    'Path to root folder of a Gleam project with tests formatted with Luciole that will be transpiled. It can also be the path of a single gleam file that will be transpiled.',
  )
  .argument(
    '[tests-dest]',
    'Path to folder where test files will be generated. If not specified, will look for any "cypress" folder in the gleam directory and its ancestors.',
  )
  .option(
    '-b, --build-dest <build-dest>',
    'Destination path for build files. Default to their current location, meaning that the generated files will imports modules from the build created by Gleam.',
  )
  .action((gleamSrc, testsDest, options) => {
    main(gleamSrc, testsDest, options.buildDest)
  })

program
  .command('show-ast')
  .description('Show AST (Abstract Syntaxic Tree) components.')
  .argument('<ts-path>', 'Path to TypeScript file.')
  .action((tsPath) => {
    showAST(tsPath)
  })

program.parse(process.argv)

/**
 * Iterate on tests, transpile them and generate their code in an identical file tree.
 */
async function main(
  gleamArg: string,
  testsDest: string,
  buildDest: string,
): Promise<void> {
  // handle args
  if (testsDest === undefined) {
    const defaultDest = path.join('cypress', 'e2e')
    testsDest = await io.findFileInAncestors(defaultDest, gleamArg)
    testsDest = path.join(testsDest, 'luciole')
    if (!fs.existsSync(testsDest)) fs.mkdirSync(testsDest, { recursive: true })
  }

  let gleamSrc: string = ''
  let testPrefix = path.join('test', 'cy')
  let testFiles: string[] = []

  if (gleamArg.endsWith('.gleam')) {
    if (fs.existsSync(gleamArg)) {
      testFiles = [gleamArg]
      gleamSrc = await io.findFileInAncestors('gleam.toml', gleamArg)
      gleamSrc = path.resolve(gleamSrc, '..')
    } else {
      throw Error(gleamArg + " doesn't exist.")
    }
  } else {
    gleamSrc = gleamArg
    const testFilesRoot = path.resolve(path.join(gleamSrc, testPrefix))
    testFiles = await io.getAllTestFiles(testFilesRoot, '')
  }
  let projectName = await io.getGleamProjectName(gleamSrc)

  // compile and copy the build
  io.compileGleam(gleamSrc)
  if (buildDest === undefined) {
    buildDest = gleamSrc
    console.log('buildDest: ' + buildDest)
  } else {
    console.log('buildDest: ' + buildDest)
    io.copyGleamBuild(gleamSrc, buildDest)
  }

  // transpile tests
  for (const sourceFile of testFiles) {
    console.log('\nCurrent test is "' + path.relative('.', sourceFile) + '".')

    const relativePath = path.relative(gleamSrc, sourceFile)
    let relativePathWithoutPrefix = path.relative(testPrefix, relativePath) // remove test prefix
    let cypressFilePath = path.resolve(
      path.join(testsDest, relativePathWithoutPrefix),
    )
    cypressFilePath = setExtensionTo(cypressFilePath, '.cy.js')
    let buildDestFilePath = path.resolve(
      buildDest,
      'build',
      'dev',
      'javascript',
      projectName,
      'cy',
      relativePathWithoutPrefix,
    )
    buildDestFilePath = setExtensionTo(buildDestFilePath, '.mjs')

    fs.mkdir(path.dirname(cypressFilePath), { recursive: true }, (err) => {
      if (err) {
        return console.error(err)
      }
    })
    let testCode = await io.readTest(buildDestFilePath)
    testCode = transpile.transpile(testCode, buildDestFilePath, cypressFilePath)
    await io.writeTest(testCode, cypressFilePath)
  }

  console.log('Done.')
}
