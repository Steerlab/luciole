import gleam/dynamic.{type Dynamic}

pub type Chainable(a)

pub type Body(a) =
  fn() -> Chainable(a)

pub type Test {
  Test(name: String, body: Body(Dynamic))
  Suite(name: String, suite: List(Test))
}
