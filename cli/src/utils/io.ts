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

export async function readTest(filePath: string): Promise<string> {
  console.log('Reading test...')
  return await fs.promises.readFile(filePath, 'utf-8')
}

export async function writeTest(content: string, filePath: string) {
  console.log('Writing test...')
  const dir = path.dirname(filePath)
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true })
  await fs.promises.writeFile(filePath, content, 'utf-8')
}

export function formatTest(filePath: string): void {
  const cmd = `yarn prettier ${filePath} --write --ignore-path ''`
  execSync(cmd, {
    encoding: 'utf-8',
    cwd: './',
  })
}

/**
 * Recursively collects files which name ends in '_test'.
 */
export async function getAllTestFiles(
  dir: string,
  suffix = '_test',
): Promise<string[]> {
  const entries = await fs.promises.readdir(dir, { withFileTypes: true })
  const files: string[] = []
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name)
    if (entry.isDirectory()) {
      files.push(...(await getAllTestFiles(fullPath, suffix)))
    } else {
      const baseName = path.parse(entry.name).name
      if (baseName.endsWith(suffix)) {
        files.push(fullPath)
      }
    }
  }
  return files
}
