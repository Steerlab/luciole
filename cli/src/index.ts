import * as fs from 'node:fs'
import * as io from './utils/io.ts'
import * as path from 'node:path'
import * as transpile from './utils/transpile.ts'
import { Command } from 'commander'
import { showAST } from './utils/show_ast.ts'
import { setExtensionTo } from './utils/path_helper.ts'
import { pathToFileURL } from 'node:url'

const program = new Command()

program
  .command('transpile')
  .description(
    'Creates an AST from a JavaScript file, parse it and generate the resulting code.',
  )
  .argument('<gleam-src>', 'Path to root folder of Gleam project.')
  .argument('<tests-dest>', 'Destination path to root folder of Cypress tests.')
  .option(
    '-b, --build-dest <build-dest>',
    'Destination path for build files. Default to its current location.',
  )
  // .argument('<build-dest>', 'Destination path for build files.')
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
 * Iterate recursively on tests, transpile them and generate them in a copied tree folder structure.
 */
async function main(
  gleamSrc: string,
  testsDest: string,
  buildDest: string,
): Promise<void> {
  if (buildDest === undefined) {
    buildDest = path.join(gleamSrc, 'build')
  }
  const projectName = await io.getGleamProjectName(gleamSrc)
  const testPrefix = path.join('test', 'cy')
  const testFilesRoot = path.resolve(path.join(gleamSrc, testPrefix))
  const testFiles = await io.getAllTestFiles(testFilesRoot)

  io.compileGleam(gleamSrc)
  io.copyGleamBuild(gleamSrc, buildDest)

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
    // console.log('relativePath: ' + relativePath)
    // console.log('relativePathWithoutPrefix: ' + relativePathWithoutPrefix)
    // console.log('cypressFile: ' + cypressFilePath)
    // console.log('buildDestFile: ' + buildDestFilePath)

    fs.mkdir(path.dirname(cypressFilePath), { recursive: true }, (err) => {
      if (err) {
        return console.error(err)
      }
    })
    let testCode = await io.readTest(buildDestFilePath)
    testCode = transpile.transpile(testCode, buildDestFilePath, cypressFilePath)
    await io.writeTest(testCode, cypressFilePath)
    io.formatTest(cypressFilePath)
  }

  console.log('Done.')
}
