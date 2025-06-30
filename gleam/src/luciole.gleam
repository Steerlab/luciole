import luciole/types.{type Chainable, type Test}

pub fn describe(name: String, suite: List(Test)) -> Test {
  types.Suite(name, suite)
}

pub fn it(name: String, body: fn() -> Chainable) -> Test {
  types.Test(name, body)
}
