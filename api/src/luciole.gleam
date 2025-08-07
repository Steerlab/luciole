import gleam/dynamic.{type Dynamic}
import unsafe/unsafe

pub type Chainable(a)

pub type Body(a) =
  fn() -> Chainable(a)

pub type Test {
  Test(name: String, body: Body(Dynamic))
  Suite(name: String, suite: List(Test))
}

pub type Enable {
  Enable
  Skip
  Only
}

/// `describe` declares a group of tests (a test suite) with a title.
/// This suite will run if there is no `only` blocks at the same level,
/// or if it contains an `only` block itself.
///
/// See [Cypress Documentation - Test Structure](https://docs.cypress.io/app/core-concepts/writing-and-organizing-tests#Test-Structure)
pub fn describe(name: String, suite: List(Test)) -> Test {
  Suite(name, suite)
}

/// `describe_skip` declares a group of tests (a test suite) with a title.
/// This suite won't run.
///
/// See [Cypress Documentation - Test Structure](https://docs.cypress.io/app/core-concepts/writing-and-organizing-tests#Test-Structure)
pub fn describe_skip(name: String, suite: List(Test)) -> Test {
  Suite(name, suite)
}

/// `describe_only` declares a group of tests (a test suite) with a title.
/// This suite will necessarily run.
/// Other blocks in the same suite that aren't `only` won't run.
///
/// See [Cypress Documentation - Test Structure](https://docs.cypress.io/app/core-concepts/writing-and-organizing-tests#Test-Structure)
pub fn describe_only(name: String, suite: List(Test)) -> Test {
  Suite(name, suite)
}

/// `it` declares a single test with a title.
/// It will run if there is no `only` blocks at the same level in its suite.
///
/// See [Cypress Documentation - Test Structure](https://docs.cypress.io/app/core-concepts/writing-and-organizing-tests#Test-Structure)
pub fn it(name: String, body: Body(a)) -> Test {
  Test(name, unsafe.coerce(body))
}

/// `it_skip` declares a single test with a title.
/// It won't run.
///
/// See [Cypress Documentation - Test Structure](https://docs.cypress.io/app/core-concepts/writing-and-organizing-tests#Test-Structure)
pub fn it_skip(name: String, body: Body(a)) -> Test {
  Test(name, unsafe.coerce(body))
}

/// `it_only` declares a test with a title.
/// It will necessarily run.
/// Other blocks in the same suite that aren't `only` won't run.
///
/// See [Cypress Documentation - Test Structure](https://docs.cypress.io/app/core-concepts/writing-and-organizing-tests#Test-Structure)
pub fn it_only(name: String, body: Body(a)) -> Test {
  Test(name, unsafe.coerce(body))
}

/// `before` declares what will run once
/// before the first test of the suite.
///
/// See [Cypress Documentation - Hooks](https://docs.cypress.io/app/core-concepts/writing-and-organizing-tests#Hooks).
pub fn before(name: String, body: Body(a)) -> Test {
  Test(name, unsafe.coerce(body))
}

/// `before_each` declares what will run
/// before each test of the suite.
///
/// See [Cypress Documentation - Hooks](https://docs.cypress.io/app/core-concepts/writing-and-organizing-tests#Hooks).
pub fn before_each(name: String, body: Body(a)) -> Test {
  Test(name, unsafe.coerce(body))
}

/// `after` declares what will run once
/// after the last test of the suite.
///
/// See [Cypress Documentation - Hooks](https://docs.cypress.io/app/core-concepts/writing-and-organizing-tests#Hooks).
pub fn after(name: String, body: Body(a)) -> Test {
  Test(name, unsafe.coerce(body))
}

/// `after_each` declares what will run
/// after each test of the suite.
///
/// See [Cypress Documentation - Hooks](https://docs.cypress.io/app/core-concepts/writing-and-organizing-tests#Hooks).
pub fn after_each(name: String, body: Body(a)) -> Test {
  Test(name, unsafe.coerce(body))
}
