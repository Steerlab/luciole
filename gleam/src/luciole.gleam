import gleam/dynamic.{type Dynamic}
import unsafe/unsafe

pub type Chainable(a)

pub type Body(a) =
  fn() -> Chainable(a)

pub type Test {
  Test(name: String, body: Body(Dynamic))
  Suite(name: String, suite: List(Test))
}

pub fn describe(name: String, suite: List(Test)) -> Test {
  Suite(name, suite)
}

pub fn it(name: String, body: Body(a)) -> Test {
  Test(name, unsafe.coerce(body))
}

pub fn before(name: String, body: Body(a)) -> Test {
  Test(name, unsafe.coerce(body))
}

pub fn before_each(name: String, body: Body(a)) -> Test {
  Test(name, unsafe.coerce(body))
}

pub fn after(name: String, body: Body(a)) -> Test {
  Test(name, unsafe.coerce(body))
}

pub fn after_each(name: String, body: Body(a)) -> Test {
  Test(name, unsafe.coerce(body))
}
