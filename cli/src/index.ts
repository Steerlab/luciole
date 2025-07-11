import * as fs from 'node:fs'
import * as io from './utils/io.ts'
import * as path from 'node:path'
import * as transpile from './utils/transpile.ts'
import { Command } from 'commander'
import { showAST } from './utils/show_ast.ts'

const program = new Command()

program
  .command('transpile')
  .description(
    'Creates an AST from a JavaScript file, parse it and generate the resulting code.',
  )
  .argument('<gleam-src>', 'Path to root folder of Gleam project.')
  .argument('<build-dest>', 'Destination path for build files.')
  .argument('<tests-dest>', 'Destination path to root folder of Cypress tests.')
  .action((gleamSrc, buildDest, testsDest) => {
    main(gleamSrc, buildDest, testsDest)
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
  buildDest: string,
  testsDest: string,
): Promise<void> {
  io.compileGleam(gleamSrc)
  io.copyGleamBuild(gleamSrc, buildDest)

  const testFilesPath = path.resolve(gleamSrc, 'test') // search tests files in the "test" folder in gleamSrc
  const testFiles = await io.getAllTestFiles(testFilesPath)

  for (const sourceFile of testFiles) {
    console.log('\n' + sourceFile)
    const relativePath = path.relative(gleamSrc, sourceFile)
    let cypressFilePath = path.join(testsDest, relativePath)

    fs.mkdir(path.dirname(cypressFilePath), { recursive: true }, (err) => {
      if (err) {
        return console.error(err)
      }
    })

    let relativePathWithoutTest = path.relative(
      path.join(relativePath.split(path.sep)[0]),
      relativePath,
    ) // remove the first element of the path (should remove "test")
    let buildDestFilePath = path.resolve(
      buildDest,
      'build',
      'dev',
      'javascript',
      'luciole', // should generalize this but i don't know how yet
      relativePathWithoutTest,
    )
    buildDestFilePath = path.format({
      ...path.parse(buildDestFilePath),
      base: undefined, // works only with this, idk why
      ext: '.mjs',
    })

    let testCode = await io.readTest(buildDestFilePath)
    testCode = transpile.transpile(testCode, buildDestFilePath, cypressFilePath)

    // set the correct extension to generated files : .cy.js
    cypressFilePath = path.format({
      ...path.parse(cypressFilePath),
      base: undefined, // works only with this, idk why
      ext: '.cy.js',
    })
    await io.writeTest(testCode, cypressFilePath)
    io.formatTest(cypressFilePath)
  }

  console.log('Done.')
}
