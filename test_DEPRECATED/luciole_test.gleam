import describe_test
import gleam/io
import gleam/list
import luciole
import luciole/test_tree
import pprint
import simplifile

pub fn main() {
  io.println("")
  all_tests()
}

pub fn simple_test() {
  describe_test.it_test()
  |> luciole.to_cypress_code
  |> io.println
}

type TestInfo {
  TestInfo(test_fun: fn() -> test_tree.TestTree, filepath: String)
}

pub fn all_tests() {
  let test_funs = [
    TestInfo(describe_test.it_test, "cypress/e2e/generated/it.cy.js"),
    TestInfo(
      describe_test.describe_test,
      "cypress/e2e/generated/describe.cy.js",
    ),
    TestInfo(
      describe_test.more_describe_test,
      "cypress/e2e/generated/more.cy.js",
    ),
    TestInfo(describe_test.hook_test, "cypress/e2e/generated/hook.cy.js"),
    TestInfo(
      describe_test.auth_token_test,
      "cypress/e2e/generated/auth-token.cy.js",
    ),
  ]

  list.map(test_funs, with: fn(test_info) {
    let TestInfo(test_fun, filepath) = test_info
    let _ = simplifile.delete(filepath)
    test_fun()
    |> luciole.to_cypress_code
    |> pprint.debug
    |> luciole.make_test_file(at: filepath)
  })
}
