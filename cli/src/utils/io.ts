import * as path from 'node:path'
import * as fs from 'node:fs'
import * as toml from 'toml'
import * as prettier from 'prettier'
import { execSync } from 'node:child_process'
import { ESLint } from 'eslint'

export function compileGleam(cwd: string): void {
  console.log('Compiling Gleam...')
  execSync('gleam build --target=js', { encoding: 'utf-8', cwd })
}

export function copyGleamBuild(
  gleamPath: string,
  buildDestinationPath: string,
): void {
  const source = path.resolve(gleamPath, 'build')
  const dest = path.resolve(buildDestinationPath)
  console.log('Copying build from "' + source + '" to "' + dest + '".')
  execSync(`cp -Rf ${source} ${dest}`, {
    encoding: 'utf-8',
    cwd: './',
  })
}

export async function readTest(filePath: string): Promise<string> {
  console.log('Reading from "' + path.relative('.', filePath) + '".')
  return await fs.promises.readFile(filePath, 'utf-8')
}

export async function writeTest(content: string, filePath: string) {
  console.log('Writing at "' + path.relative('.', filePath) + '".')
  content = await formatTest(content, filePath)
  const dir = path.dirname(filePath)
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true })
  await fs.promises.writeFile(filePath, content, 'utf-8')
}

export async function formatTest(
  content: string,
  filePath: string,
): Promise<string> {
  const config = await prettier.resolveConfig(filePath)
  content = await prettier.format(content, {
    ...config,
    parser: 'typescript',
  })
  const eslint = new ESLint({
    fix: true,
    overrideConfig: {
      languageOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
      },
      rules: {
        'padding-line-between-statements': [
          'error',
          {
            blankLine: 'always',
            prev: ['import'],
            next: ['expression'],
          },
          {
            blankLine: 'always',
            prev: ['function'],
            next: ['*'],
          },
          {
            blankLine: 'always',
            prev: ['*'],
            next: ['function'],
          },
        ],
      },
    },
  })
  const results = await eslint.lintText(content)
  return results[0].output ?? content
}

/**
 * Recursively collects Gleam files which name ends with the given suffix.
 */
export async function getAllTestFiles(
  dir: string,
  suffix: string = '_cy',
): Promise<string[]> {
  const entries = await fs.promises.readdir(dir, { withFileTypes: true })
  const files: string[] = []
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name)
    if (entry.isDirectory()) {
      files.push(...(await getAllTestFiles(fullPath, suffix)))
    } else {
      const baseName = path.parse(entry.name).name
      if (
        path.extname(entry.name) === '.gleam' &&
        (suffix === '' || baseName.endsWith(suffix))
      ) {
        files.push(path.resolve(fullPath))
      }
    }
  }
  return files
}

/**
 * Looks for the project's name in the gleam.toml file.
 * Starts to look for the file in current dir, then its ancestors recursively.
 */
export async function getGleamProjectName(dir: string): Promise<string> {
  const filePath = await findFileInAncestors('gleam.toml', dir)
  const content = await fs.promises.readFile(filePath, 'utf-8')
  const data = toml.parse(content)
  return data.name
}

/**
 * Looks for a file in the given directory and its ancestors, then return its absolute path.
 */
export async function findFileInAncestors(
  search: string,
  curdir: string,
): Promise<string> {
  const curpath = path.join(curdir, search)
  if (fs.existsSync(curpath)) {
    return curpath
  } else if (curdir === path.sep) {
    throw Error(
      search +
        ' was not found. ' +
        '(Are your tests files located in the directory "test/cy/" of the Gleam project?)',
    )
  } else {
    return findFileInAncestors(search, path.resolve(curdir, '..'))
  }
}
