import { Command } from 'commander';
import * as fs from 'fs';
import * as espree from 'espree';
import * as escodegen from 'escodegen';
import * as path from 'path';

const program = new Command();
const execSync = require('child_process').execSync;

program
  .name('my-cli')
  .description('CLI for compiling Gleam tests to Cypress tests. ')
  .version('1.0.0');

program
  .command('hello')
  .description('Prints Hello World')
  .action(() => {
    console.log('Hello, world!');
  });

program
  .command('gleam-build')
  .description('Compiles Gleam files to JavaScript')
  .action(() => {
    compile_gleam();
  });

program
  .command('parse')
  .description('Creates an AST from a JavaScript file')
  .action(() => {
    get_ast("../gleam/build/dev/javascript/luciole/describe_test.mjs");
    // get_ast("./tmp.mjs");
  });

function compile_gleam() {
  const output = execSync('gleam build --target=js', { encoding: 'utf-8', cwd: './../gleam/' });
}

function get_ast(filepath: string) {
  const absolutePath = path.resolve(filepath);
  const code = fs.readFileSync(absolutePath, 'utf-8');

  const ast = espree.parse(code, {
    ecmaVersion: 'latest',
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
    },
  });

  // console.dir(ast, { depth: null, colors: true });
  const cypress_code = escodegen.generate(ast)
  console.log(cypress_code)
  return ast;
}

program.parse(process.argv);
