import gleam/string
import luciole/test_tree.{
  type Body, type TestCase, type TestTree, Suite, TestCase,
}

pub fn to_cypress_code(test_tree: TestTree) {
  test_tree.to_cypress_code(test_tree)
  |> string.join(with: "\n")
}

pub fn it(name: String, body: Body) -> TestTree {
  TestCase(name, body, False) |> test_tree.LeafTest
}

pub fn describe(name: String, suite: List(TestTree)) -> TestTree {
  Suite(name, suite)
}

pub fn before(body: Body) -> TestTree {
  test_tree.Before(body) |> test_tree.LeafHook
}

pub fn before_each(body: Body) -> TestTree {
  test_tree.BeforeEach(body) |> test_tree.LeafHook
}

pub fn after(body: Body) -> TestTree {
  test_tree.After(body) |> test_tree.LeafHook
}

pub fn after_each(body: Body) -> TestTree {
  test_tree.AfterEach(body) |> test_tree.LeafHook
}
