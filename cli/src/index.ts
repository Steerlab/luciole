import { Command } from 'commander';

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
  .description('Compiles Gleam test files')
  .action(() => {
    compile_gleam();
  });

function compile_gleam() {
  const output = execSync('gleam build --target=js', { encoding: 'utf-8', cwd: './../gleam/' });
}

program.parse(process.argv);
