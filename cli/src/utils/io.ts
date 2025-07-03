import path from 'path'
import fs from 'fs'

const execSync = require('child_process').execSync

export function compile_gleam(cwd: string): void {
  console.log('Compiling Gleam...')
  const output = execSync('gleam build --target=js', {
    encoding: 'utf-8',
    cwd: cwd,
  })
}

export function copy_gleam_build(
  gleamPath: string,
  buildDestinationPath: string,
): void {
  console.log('Copying build...')
  const source = `${gleamPath}build/`
  const dest = `${buildDestinationPath}build/`
  const output = execSync(`cp -R ${source} ${dest}`, {
    encoding: 'utf-8',
    cwd: './',
  })
}

export function read_test(buildDestinationPath: string): string {
  console.log('Reading test...')
  const filepath = `${buildDestinationPath}build/dev/javascript/luciole/describe_test.mjs`
  const absolutePath = path.resolve(filepath)
  const content = fs.readFileSync(absolutePath, 'utf-8')
  return content
}

export function write_test(content: string, dirpath: string): void {
  console.log('Writing test...')
  const absolutePath = path.resolve(`${dirpath}describe_test.cy.js`)
  const dir = path.dirname(absolutePath)
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true })
  }
  fs.writeFileSync(absolutePath, content, 'utf-8')
}
