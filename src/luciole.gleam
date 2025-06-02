import gleam/string
import luciole/test_tree.{
  type Body, type TestCase, type TestTree, Suite, TestCase,
}

pub fn it(name: String, body: Body) -> TestTree {
  TestCase(name, body, False) |> test_tree.LeafTest
}

pub fn describe(name: String, suite: List(TestTree)) -> TestTree {
  Suite(name, suite)
}

pub fn to_cypress_code(test_tree: TestTree) {
  test_tree.to_cypress_code(test_tree)
  |> string.join(with: "\n")
}
