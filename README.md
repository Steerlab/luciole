# Luciole

The CLI for compiling Gleam tests to Cypress tests.
And a Cypress API in Gleam.

<!-- [![Package Version](https://img.shields.io/hexpm/v/luciole)](https://hex.pm/packages/luciole)
[![Hex Docs](https://img.shields.io/badge/hex-docs-ffaff3)](https://hexdocs.pm/luciole/) -->

```sh
gleam add luciole@1
```

```gleam
import luciole

pub fn main() {
  // TODO: An example of the project in use
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
