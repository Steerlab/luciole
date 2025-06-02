import gleam/list

pub type TestBody =
  fn() -> Bool

pub type TestCase {
  TestCase(name: String, body: TestBody, skipped: Bool)
}

pub type HookBody =
  Nil

pub type Hook {
  Before(HookBody)
  BeforeEach(HookBody)
  After(HookBody)
  AfterEach(HookBody)
}

pub type TestTree {
  LeafTest(TestCase)
  LeafHook(Hook)
  Suite(name: String, suite: List(TestTree))
}

pub fn to_cypress_code(test_tree: TestTree) -> List(String) {
  case test_tree {
    LeafTest(test_case) -> todo
    LeafHook(hook) -> todo
    Suite(name: name, suite: suite) ->
      list.flatten([
        ["describe('" <> name <> "', function () {"],
        suite_to_cypress_code(suite),
        ["}"],
      ])
  }
}

fn suite_to_cypress_code(suite: List(TestTree)) -> List(String) {
  case suite {
    [] -> [""]
    [test_tree, ..tail] ->
      list.flatten([to_cypress_code(test_tree), suite_to_cypress_code(tail)])
  }
}
