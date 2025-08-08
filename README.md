# Luciole

An API for writting Cypress tests in Gleam and a CLI for compiling those tests in JavaScript.

Luciole is the french word for firefly, but contrary to other bugs, this one will illuminate the night and help you find bugs in your app. This program is composed of a Gleam API for writting Cypress tests, and a CLI to transpile them to JavaScript with Cypress syntax.

<!-- [![Package Version](https://img.shields.io/hexpm/v/luciole)](https://hex.pm/packages/luciole)
[![Hex Docs](https://img.shields.io/badge/hex-docs-ffaff3)](https://hexdocs.pm/luciole/) -->

## Requirements

- Node.js >= 24.x
- Gleam >= 1.9.x
- Cypress >= 14.x
- Any package manager (ex: yarn >= 1.22)

## Installation

Maybe try this? I am not sure how I will release this tool since it's made of a Gleam API and a TypeScript CLI...

```sh
gleam add luciole
yarn add luciole
```

## Run the CLI

Run this command to transpile the Cypress-for-Gleam files to Cypress-for-JavaScript files, by replacing `<project-path>` with the path to your Gleam project:

```sh
yarn luciole transpile <project-path>
```

Tests are generated in `cypress/e2e/luciole/`.

## Get started with the API

Go to your Gleam project and create a directory `cy` under the `test` directory.
Create a file named `example.gleam` inside `test/cy/`. You can copy the following code for a minimal test example. This test goes to the Cypress example page and checks that the body of the page contains the word "Kitchen".

```gleam
import luciole.{describe, it}
import luciole/cypress as cy
import luciole/should

pub fn example_cy() {
  describe("my awesome project", [
    it("goes to Cypress example page", fn() {
      cy.visit("https://example.cypress.io")
      cy.get("body") |> should.contain("Kitchen")
    }),
  ])
}
```

Then [run the CLI](#run-the-cli) to transpile every files of `test/cy/` to JavaScript files. After that, you can simply open Cypress and check your tests in `e2e/luciole/`.

```sh
yarn luciole transpile <project-path>
yarn cypress open
```

More test examples are available in [api/test/cy](api/test/cy).

## More about the API

### File tree

Your tests should be written in Gleam files located in the folder `test/cy` at the root of your Gleam project.

Each test file should contain one test function at top-level with a name ending in "_cy".

The file may contain other functions and others as well, but only the function ending in "_cy" will be transpiled by Luciole. You can use the API's functions in any function of your test file, except the functions of the base module `luciole.gleam` that should only be called in the "_cy" function. See [api/test/cy/nesting/multiple_fun.gleam](api/test/cy/nesting/multiple_fun.gleam).

> [!WARNING]
> If functions of the base module `luciole.gleam` are used in functions not ending in `_cy`, the transpilation will have unexpected behaviours.

By default, the CLI will compile the Gleam project to JavaScript, create the AST of each compiled test, edit it to follow Cypress syntax, and generate code from it in a Cypress directory. To do so, the program will look for the name of the Gleam project in the first `gleam.toml` file found by searching up in the file tree. It will also look for the first directory named `cypress` when searching up the file tree.

The Gleam build will be copied to a new path if you specify the option `--buildDest <new-path-to-build>`. Test files imports will be updated based on the new location of the build.

> [!WARNING]
> Files in `cypress/e2e/luciole/` will be overwritten by the new generated tests. You can avoid this by specifying another test destination, like this:
> ```
> yarn luciole transpile <project-path> <test-destination>
> ```

### Test file

The test function has a name ending in "_cy". Its body is composed of any number of `describe`, `it` and `hooks` blocks. A `describe` can contain any number of these blocks. An `it` and a `hook` can only contain a test body. A test body is made of multiple ordered expressions that will check the state of your DOM. You can write these expressions using the functions of the API.

Those function bodies are correct: ✅
- `it(body)`: one `it` at top-level
- `describe([ it(body) ])`: an `it` in a `describe`
- `describe([ it(body), it(body) ])`: multiple `it` in a `describe`
- `describe([ describe([ describe([ it(body) ]) ]) ])`: multiple `describe` nested
- `describe([ it(body), describe([ it(body) ]) ])`: switching between `describe` and `it` in a `describe`

Those function bodies are not correct: ❌
- `describe([ body ])` : a test body outside of `it`
- `it([ it(body) ])` : multiple `it` nested
- `it([ describe( it(body) ) ])`: an `it` containing a `describe`

### Modules organisation

Blocks functions like `describe`, `it` and `hooks` are located in the base module `luciole.gleam`.

Fonctions that can be called at the begining of a chain are located in `luciole/cypress.gleam` module.

Fonctions that can be chained after another fonction are located in `luciole/chain.gleam` module.

The `should()` fonction of Cypress is implemented in the `luciole/should.gleam` module. Each fonction correspond to one of should's options, like `should.equal(x)` in Gleam for `should('equal', x)` in JavaScript.

The `location()`function of Cypress is implemented in the `luciole/location.gleam` module. It has 2 functions, the first one returns the location object: `location.get()`. The second one returns an attribute of the location object as a string, using a variant of the `location.Key` type: `location.get_key(location.Port)`.
