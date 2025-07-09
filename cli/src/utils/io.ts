import * as path from 'node:path'
import * as fs from 'node:fs'
import { execSync } from 'node:child_process'
// import * as prettier from 'prettier'

export function compileGleam(cwd: string): void {
  console.log('Compiling Gleam...')
  execSync('gleam build --target=js', { encoding: 'utf-8', cwd })
}

export function copyGleamBuild(
  gleamPath: string,
  buildDestinationPath: string,
): void {
  console.log('Copying build...')
  const source = `${gleamPath}build/`
  const dest = `${buildDestinationPath}build/`
  execSync(`cp -R ${source} ${dest}`, {
    encoding: 'utf-8',
    cwd: './',
  })
}

export async function readTest(buildDestinationPath: string): Promise<string> {
  console.log('Reading test...')
  const filepath = `${buildDestinationPath}build/dev/javascript/luciole/describe_test.mjs`
  const absolutePath = path.resolve(filepath)
  return await fs.promises.readFile(absolutePath, 'utf-8')
}

export async function writeTest(content: string, dirpath: string) {
  console.log('Writing test...')
  const absolutePath = path.resolve(`${dirpath}describe_test.cy.js`)
  const dir = path.dirname(absolutePath)
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true })
  await fs.promises.writeFile(absolutePath, content, 'utf-8')
}

export function formatTest(filepath: string): void {
  const absolutePath = path.resolve(filepath)
  // prettier.format(`${absolutePath}/describe_test.cy.js`)
  const cmd = `yarn prettier ${absolutePath}/describe_test.cy.js --write --ignore-path ''`
  execSync(cmd, {
    encoding: 'utf-8',
    cwd: './',
  })
}
