# Luciole

An API for writting Cypress tests in Gleam and a CLI for compiling those tests in JavaScript.

Luciole is the french word for firefly, but contrary to other bugs, this one will illuminate the night and help you find bugs in your app. It's made of an API for writting tests in Gleam and a CLI to translate them into Cypress-readable JavaScript code.

<!-- [![Package Version](https://img.shields.io/hexpm/v/luciole)](https://hex.pm/packages/luciole)
[![Hex Docs](https://img.shields.io/badge/hex-docs-ffaff3)](https://hexdocs.pm/luciole/) -->


## Requirements

- Node.js >= 24.x
- Yarn >= 1.22
- TypeScript >= 5.x
- Gleam >= 1.9.x
- Cypress >= 14.x

## Installation

Maybe try this? I am not sure how I will release this tool for now, since it's made of a Gleam API and a TypeScript CLI...

```sh
gleam add luciole
yarn add luciole
```

## Get started

Here is how to create a small test:

```gleam
import luciole.{describe, it}
import luciole/cypress as cy
import luciole/should

pub fn describe_test() {
  describe("my awesome project", [
    it("goes to Cypress example page", fn() {
      cy.visit("https://example.cypress.io")
      cy.get("body") |> should.contain("Kitchen")
    }),
  ])
}
```

More examples are available in [./gleam/test/cy](./gleam/test/cy).

## Development

<!-- Cypress API in Gleam:
```sh
cd gleam
gleam run # Run the project
gleam test # Run the tests
gleam build --target=js # Compile the project and tests to JavaScript
``` -->

JavaScript CLI:
```sh
yarn luciole [command] # Run the project
yarn luciole transpile "gleam" "cypress/e2e/generated" -b "cypress" # Run the project in my folder tree
```

Cypress:
```sh
yarn cypress open # Open Cypress
```

## More about the API

Your tests should be written in Gleam files with name ending in "_cy.gleam", and located in the folder `test/cy` of your Gleam project. Each test file should contain only one test at top-level. This test is composed of any number of nested `describe` and `it`, and at least one inner `it` containing the test body. A `describe` can contain other `describe` and `it`. An `it` can only contain the test body.

Those formats are correct: ✅
- `it(body)`: one `it` at top-level
- `describe( [it(body)] )`: an `it` in a `describe`
- `describe( [it(body), ..., it(body)] )`: multiple `it` in a `describe`
- `describe( [describe( [... describe( [it(body)] )... ] )] )`: multiple `describe` nested
- `describe( [it(body), describe( [it(body)] )] )`: switching between `describe` and `it` in a `describe`

Those formats are not correct: ❌
- `describe( [body] )` : a test body outside of `it`
- `it( [it(body)] )` : multiple `it` nested
- `it( [describe(...)] )`: an `it` containing a `describe`
