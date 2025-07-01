import luciole/types.{type Body, type Test}

pub fn describe(name: String, suite: List(Test)) -> Test {
  types.Suite(name, suite)
}

pub fn it(name: String, body: Body) -> Test {
  types.Test(name, body)
}
