pub type Chainable

pub type Body =
  fn() -> Chainable

pub type Test {
  Test(name: String, body: Body)
  Suite(name: String, suite: List(Test))
}
