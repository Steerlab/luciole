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
  const output = execSync(`cp -R -v -n ${source} ${dest}`, {
    encoding: 'utf-8',
    cwd: './',
  })
}

export function read_test(buildDestinationPath: string): string {
  console.log('Reading test...')
  // TODO
  return ''
}

export function write_test(test_code: string, test_path: string): void {
  console.log('Writing test...')
  // TODO
}
