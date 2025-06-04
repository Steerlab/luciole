import gleam/string
import luciole/leaf.{type Body}
import luciole/test_tree.{type TestTree}
import simplifile

pub fn make_test_file(at path: String, contents contents: String) {
  case simplifile.create_file(path) {
    Ok(_) -> {
      let _ = simplifile.write(to: path, contents: contents)
      Nil
    }
    Error(_) -> {
      echo "File " <> path <> " already exists. Please delete it."
      Nil
    }
  }
}

pub fn to_cypress_code(test_tree: TestTree) -> String {
  test_tree.to_cypress_code(test_tree)
  |> string.join(with: "\n")
  |> string.append("\n")
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
