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
    'Path to root folder of a Gleam project with tests formatted with Luciole.',
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
 * Iterate recursively on tests, transpile them and generate them in an identical file tree.
 */
async function main(
  gleamSrc: string,
  testsDest: string,
  buildDest: string,
): Promise<void> {
  // args handling
  if (buildDest === undefined) {
    buildDest = path.join(gleamSrc, 'build')
  }
  if (testsDest === undefined) {
    const defaultDest = path.join('cypress', 'e2e')
    testsDest = await io.findFileInAncestors(defaultDest, gleamSrc)
    testsDest = path.join(testsDest, 'luciole')
    if (!fs.existsSync(testsDest)) fs.mkdirSync(testsDest, { recursive: true })
  }

  const projectName = await io.getGleamProjectName(gleamSrc)
  const testPrefix = path.join('test', 'cy')
  const testFilesRoot = path.resolve(path.join(gleamSrc, testPrefix))
  const testFiles = await io.getAllTestFiles(testFilesRoot, '')

  io.compileGleam(gleamSrc)
  if (gleamSrc !== buildDest) {
    io.copyGleamBuild(gleamSrc, buildDest)
  }

  for (const sourceFile of testFiles) {
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

    console.log('\nsourceFile: ' + sourceFile)

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
