import luciole/types.{type Body, type Test}
import luciole/unsafe/unsafe

pub fn describe(name: String, suite: List(Test)) -> Test {
  types.Suite(name, suite)
}

pub fn it(name: String, body: Body(a)) -> Test {
  types.Test(name, unsafe.coerce(body))
}
