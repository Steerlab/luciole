import luciole.{type Chainable}

/// Create an assertion.
/// Calls the Cypress should function with this function name as the chainer.
/// For example: `prev |> should.be_visible()` will become `prev.should('be.visible')`.
///
/// Yields the subject it was given, except for:
/// - have_prop: yields the value of the property
/// - have_attr: yields the value of the attribute
///
/// See [Cypress Documentation - should](https://docs.cypress.io/api/commands/should).
@external(javascript, "./should.ffi.mjs", "be_greater_than")
pub fn be_greater_than(prev: Chainable(a), val: a) -> Chainable(a)

/// Create an assertion.
/// Calls the Cypress should function with this function name as the chainer.
/// For example: `prev |> should.be_visible()` will become `prev.should('be.visible')`.
///
/// Yields the subject it was given, except for:
/// - have_prop: yields the value of the property
/// - have_attr: yields the value of the attribute
///
/// See [Cypress Documentation - should](https://docs.cypress.io/api/commands/should).
@external(javascript, "./should.ffi.mjs", "be_less_than")
pub fn be_less_than(prev: Chainable(a), val: a) -> Chainable(a)

/// Create an assertion.
/// Calls the Cypress should function with this function name as the chainer.
/// For example: `prev |> should.be_visible()` will become `prev.should('be.visible')`.
///
/// Yields the subject it was given, except for:
/// - have_prop: yields the value of the property
/// - have_attr: yields the value of the attribute
///
/// See [Cypress Documentation - should](https://docs.cypress.io/api/commands/should).
@external(javascript, "./should.ffi.mjs", "be_visible")
pub fn be_visible(prev: Chainable(a)) -> Chainable(a)

/// Allows to make multiple assertions on a subject.
/// The return value of the callback function is ignored.
///
/// Yields the subject it was given.
///
/// See [Cypress Documentation - should#Function](https://docs.cypress.io/api/commands/should#Function).
@external(javascript, "./should.ffi.mjs", "callback")
pub fn callback(prev: Chainable(a), next: fn(a) -> b) -> Chainable(a)

/// Create an assertion.
/// Calls the Cypress should function with this function name as the chainer.
/// For example: `prev |> should.be_visible()` will become `prev.should('be.visible')`.
///
/// Yields the subject it was given, except for:
/// - have_prop: yields the value of the property
/// - have_attr: yields the value of the attribute
///
/// See [Cypress Documentation - should](https://docs.cypress.io/api/commands/should).
@external(javascript, "./should.ffi.mjs", "contain")
pub fn contain(prev: Chainable(a), text: String) -> Chainable(a)

/// Create an assertion.
/// Calls the Cypress should function with this function name as the chainer.
/// For example: `prev |> should.be_visible()` will become `prev.should('be.visible')`.
///
/// Yields the subject it was given, except for:
/// - have_prop: yields the value of the property
/// - have_attr: yields the value of the attribute
///
/// See [Cypress Documentation - should](https://docs.cypress.io/api/commands/should).
@external(javascript, "./should.ffi.mjs", "equal")
pub fn equal(prev: Chainable(a), val: a) -> Chainable(a)

/// Create an assertion.
/// Calls the Cypress should function with this function name as the chainer.
/// For example: `prev |> should.be_visible()` will become `prev.should('be.visible')`.
///
/// Yields the subject it was given, except for:
/// - have_prop: yields the value of the property
/// - have_attr: yields the value of the attribute
///
/// See [Cypress Documentation - should](https://docs.cypress.io/api/commands/should).
@external(javascript, "./should.ffi.mjs", "have_attr")
pub fn have_attr(prev: Chainable(a), attr: String) -> Chainable(a)

/// Create an assertion.
/// Calls the Cypress should function with this function name as the chainer.
/// For example: `prev |> should.be_visible()` will become `prev.should('be.visible')`.
///
/// Yields the subject it was given, except for:
/// - have_prop: yields the value of the property
/// - have_attr: yields the value of the attribute
///
/// See [Cypress Documentation - should](https://docs.cypress.io/api/commands/should).
@external(javascript, "./should.ffi.mjs", "have_class")
pub fn have_class(prev: Chainable(a), class: String) -> Chainable(a)

/// Create an assertion.
/// Calls the Cypress should function with this function name as the chainer.
/// For example: `prev |> should.be_visible()` will become `prev.should('be.visible')`.
///
/// Yields the subject it was given, except for:
/// - have_prop: yields the value of the property
/// - have_attr: yields the value of the attribute
///
/// See [Cypress Documentation - should](https://docs.cypress.io/api/commands/should).
@external(javascript, "./should.ffi.mjs", "have_length")
pub fn have_length(prev: Chainable(a), length: Int) -> Chainable(a)

/// Create an assertion.
/// Calls the Cypress should function with this function name as the chainer.
/// For example: `prev |> should.be_visible()` will become `prev.should('be.visible')`.
///
/// Yields the subject it was given, except for:
/// - have_prop: yields the value of the property
/// - have_attr: yields the value of the attribute
///
/// See [Cypress Documentation - should](https://docs.cypress.io/api/commands/should).
@external(javascript, "./should.ffi.mjs", "have_prop")
pub fn have_prop(prev: Chainable(a), prop: String) -> Chainable(a)

/// Create an assertion.
/// Calls the Cypress should function with this function name as the chainer.
/// For example: `prev |> should.be_visible()` will become `prev.should('be.visible')`.
///
/// Yields the subject it was given, except for:
/// - have_prop: yields the value of the property
/// - have_attr: yields the value of the attribute
///
/// See [Cypress Documentation - should](https://docs.cypress.io/api/commands/should).
@external(javascript, "./should.ffi.mjs", "have_value")
pub fn have_value(prev: Chainable(a), val: a) -> Chainable(a)
