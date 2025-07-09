# Luciole

An API for writting Cypress tests in Gleam and a CLI for compiling those tests in JavaScript.

<!-- [![Package Version](https://img.shields.io/hexpm/v/luciole)](https://hex.pm/packages/luciole)
[![Hex Docs](https://img.shields.io/badge/hex-docs-ffaff3)](https://hexdocs.pm/luciole/) -->

## Installation

TODO

## Usage

```gleam
import luciole.{describe, it}
import luciole/chain
import luciole/cypress as cy
import luciole/should

pub fn describe_test() {
  describe("project", [
    it("goes to Cypress example page", fn() {
      cy.visit("https://example.cypress.io")
      should.contain(cy.get("body"), "Kitchen")
      cy.get("body") |> should.contain("Kitchen")
      cy.get("body") |> chain.contains("Kitchen")
      cy.contains("Kitchen")
      cy.get("body") |> should.be_visible()
    }),
  ])
}
```

<!-- Further documentation can be found at <https://hexdocs.pm/luciole>. -->

## Development

Cypress API in Gleam:
```sh
cd gleam
gleam run # Run the project
gleam test # Run the tests
gleam build --target=js # Compile the project and tests to JavaScript
```

JavaScript CLI:
```sh
cd cli
yarn tsc # Compile the project
node dist/index.js [command] # Run the project
node dist/index.js transpile "../gleam/" "../cypress/" "../cypress/e2e/generated_4/" # Run the project in my folder tree
```

Cypress:
```sh
yarn cypress open # Open Cypress
```

## About the API

You have to write tests in a Gleam file with a name ending in "_test.gleam". Each test file should contain only one test at top-level and can contain any number of nested `describe` and `it`. A `describe` can contain other `describe` or `it`, and an `it` can only contain the test body.

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
