import gleam/list
import luciole/code
import luciole/leaf

pub type TestTree {
  LeafTest(leaf.TestCase)
  LeafHook(leaf.Hook)
  Suite(name: String, suite: List(TestTree))
}

pub fn to_cypress_code(test_tree: TestTree) -> List(String) {
  case test_tree {
    LeafTest(test_case) -> leaf.test_to_cypress_code(test_case)
    LeafHook(hook) -> leaf.hook_to_cypress_code(hook)
    Suite(name: name, suite: suite) ->
      list.flatten([
        ["describe('" <> name <> "', function () {"],
        code.indent(suite_to_cypress_code(suite)),
        ["})"],
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
