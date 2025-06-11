import { Command } from 'commander';

// console.log("Hello, world!");

const program = new Command();

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

program.parse(process.argv);
