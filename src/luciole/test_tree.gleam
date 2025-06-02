import gleam/list
import luciole/code

pub type Body =
  fn() -> Bool

pub type TestCase {
  TestCase(name: String, body: Body, skipped: Bool)
}

pub type Hook {
  Before(Body)
  BeforeEach(Body)
  After(Body)
  AfterEach(Body)
}

pub type TestTree {
  LeafTest(TestCase)
  LeafHook(Hook)
  Suite(name: String, suite: List(TestTree))
}

pub fn to_cypress_code(test_tree: TestTree) -> List(String) {
  case test_tree {
    LeafTest(test_case) -> test_to_cypress_code(test_case)
    LeafHook(hook) -> hook_to_cypress_code(hook)
    Suite(name: name, suite: suite) ->
      list.flatten([
        ["describe('" <> name <> "', function () {"],
        code.indent(suite_to_cypress_code(suite)),
        ["}"],
      ])
  }
}

fn suite_to_cypress_code(suite: List(TestTree)) -> List(String) {
  case suite {
    [] -> []
    [test_tree] -> list.flatten([to_cypress_code(test_tree)])
    [test_tree, ..tail] ->
      list.flatten([
        to_cypress_code(test_tree),
        [""],
        suite_to_cypress_code(tail),
      ])
  }
}

fn test_to_cypress_code(test_case: TestCase) -> List(String) {
  let TestCase(name:, body:, skipped:) = test_case
  let skipped = case skipped {
    True -> ".skip"
    False -> ""
  }
  list.flatten([
    ["it" <> skipped <> "('" <> name <> "', function () {"],
    code.indent(body_to_cypress_test(body)),
    ["})"],
  ])
}

fn hook_to_cypress_code(hook: Hook) -> List(String) {
  let #(hook, body) = case hook {
    Before(body) -> #("before", body)
    BeforeEach(body) -> #("beforeEach", body)
    After(body) -> #("after", body)
    AfterEach(body) -> #("afterEach", body)
  }
  list.flatten([
    [hook <> "(function () {"],
    code.indent(body_to_cypress_test(body)),
    ["})"],
  ])
}

fn body_to_cypress_test(_body: Body) -> List(String) {
  ["body"]
}
