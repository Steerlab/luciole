import gleam/string
import luciole/leaf.{type Body}
import luciole/test_tree.{type TestTree}

pub fn to_cypress_code(test_tree: TestTree) {
  test_tree.to_cypress_code(test_tree)
  |> string.join(with: "\n")
}

pub fn it(name: String, body: Body) -> TestTree {
  leaf.TestCase(name, body, False) |> test_tree.LeafTest
}

pub fn describe(name: String, suite: List(TestTree)) -> TestTree {
  test_tree.Suite(name, suite)
}

pub fn before(body: Body) -> TestTree {
  leaf.Before(body) |> test_tree.LeafHook
}

pub fn before_each(body: Body) -> TestTree {
  leaf.BeforeEach(body) |> test_tree.LeafHook
}

pub fn after(body: Body) -> TestTree {
  leaf.After(body) |> test_tree.LeafHook
}

pub fn after_each(body: Body) -> TestTree {
  leaf.AfterEach(body) |> test_tree.LeafHook
}
