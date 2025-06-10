import luciole
import pprint

pub fn main() {
  "./test/describe_test.gleam"
  |> luciole.get_code()
  |> luciole.pprint
  |> pprint.debug
  |> luciole.make_test_file(at: "./cypress/e2e/generated/test.cy.js")
}
