import gleam/io
import luciole/test_tree.{
  type TestBody, type TestCase, type TestTree, Suite, TestCase,
}

pub fn main() {
  io.println("Hello from luciole!")
}

pub fn it(name: String, body: TestBody) -> TestTree {
  TestCase(name, body, False) |> test_tree.Test
}

pub fn describe(name: String, suite: List(TestTree)) -> TestTree {
  Suite(name, suite)
}
