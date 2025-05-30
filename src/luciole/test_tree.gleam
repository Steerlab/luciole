pub type TestBody =
  fn() -> Bool

pub type TestCase {
  TestCase(name: String, body: TestBody, skipped: Bool)
}

pub type TestTree {
  Test(TestCase)
  Suite(name: String, suite: List(TestTree))
}
