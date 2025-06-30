pub type Chainable

pub type Test {
  Test(name: String, body: fn() -> Chainable)
  Suite(name: String, suite: List(Test))
}
