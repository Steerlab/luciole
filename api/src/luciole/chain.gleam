import luciole.{type Chainable}

/// Selects a file in an HTML5 input element.
///
/// Unsafe to chain further commands.
/// Yields the subject it was given.
///
/// - `filepath`: path to a file within the project root
///
/// See [Cypress Documentation - selectFile](https://docs.cypress.io/api/commands/selectfile).
@external(javascript, "./chain.ffi.mjs", "select_file")
pub fn select_file(prev: Chainable(a), filepath: String) -> Chainable(a)

/// Click a DOM element.
///
/// Unsafe to chain further commands.
/// Yields the subject it was given.
///
/// See [Cypress Documentation - click](https://docs.cypress.io/api/commands/click).
@external(javascript, "./chain.ffi.mjs", "click")
pub fn click(prev: Chainable(a)) -> Chainable(a)

/// Get the DOM element containing at least the text.
///
/// Yields the new DOM element found.
///
/// See [Cypress Documentation - contains](https://docs.cypress.io/api/commands/contains).
@external(javascript, "./chain.ffi.mjs", "contain")
pub fn contain(prev: Chainable(a), selector: String) -> Chainable(b)

/// Iterate through an array like structure and apply a function to each of its elements.
///
/// Unsafe to chain further commands.
/// Yields the subject it was given.
///
/// See [Cypress Documentation - each](https://docs.cypress.io/api/commands/each).
@external(javascript, "./chain.ffi.mjs", "each")
pub fn each(prev: Chainable(a), callback_fn: fn(a) -> b) -> Chainable(a)

/// Get the descendent DOM elements of a specific selector.
///
/// Yields the new DOM element found.
///
/// A selector can be one of or a combination of :
/// - ID selector : `#elementId`
/// - Class Selectors: `.elementClass`
/// - Tag Selectors: `div`, `span`
/// - Attribute Selectors: `[type="text"]`, `[href="/home"]`
/// - Data Attribute Selectors: `[data-cy="button-confirm"]`
/// - Combinator Selectors: `div > p`, `div + p`, `div ~ p`
/// - XPath Selectors: `//div[@id='elementId']`
///
/// See [Cypress Documentation - find](https://docs.cypress.io/api/commands/find).
@external(javascript, "./chain.ffi.mjs", "find")
pub fn find(prev: Chainable(a), selector: String) -> Chainable(b)

/// Invoke a function on the previously yielded subject.
///
/// If you chain further commands, the function of invoke will be called multiple times.
/// Yields the return value of the method.
///
/// Example: `cy.get('.input').invoke('val').should('eq', 'foo')`
///
/// See [Cypress Documentation - invoke](https://docs.cypress.io/api/commands/invoke).
@external(javascript, "./chain.ffi.mjs", "invoke")
pub fn invoke(prev: Chainable(a), fn_name: String) -> Chainable(b)

/// Apply a function on the subject of the previous command.
///
/// Unsafe to return a DOM element from the callback function and chain further commands.
/// Yields what is returned by the callback function.
///
/// See [Cypress Documentation - then](https://docs.cypress.io/api/commands/then).
@external(javascript, "./chain.ffi.mjs", "then")
pub fn map(prev: Chainable(a), callback_fn: fn(a) -> b) -> Chainable(b)

/// Apply a function on the subject of the previous command.
///
/// Unsafe to return a DOM element from the callback function and chain further commands.
/// Yields what is returned by the callback function.
///
/// See [Cypress Documentation - then](https://docs.cypress.io/api/commands/then).
@external(javascript, "./chain.ffi.mjs", "then")
pub fn then(
  prev: Chainable(a),
  callback_fn: fn(a) -> Chainable(b),
) -> Chainable(b)

/// Scopes all subsequent Cypress commands to within the element.
/// Restrict the DOM access of the callback function to the element.
/// Useful when working within a particular group of elements such as a <form>.
///
/// Unsafe to chain further commands.
/// Yields the subject it was given.
///
/// See [Cypress Documentation - within](https://docs.cypress.io/api/commands/within).
@external(javascript, "./chain.ffi.mjs", "within")
pub fn within(
  prev: Chainable(a),
  callback_fn: fn() -> Chainable(b),
) -> Chainable(a)

/// Type into a DOM element.
/// Renamed "write" because "type" is ambiguous.
///
/// Unsafe to chain further commands.
/// Yields the subject it was given.
///
/// See [Cypress Documentation - type](https://docs.cypress.io/api/commands/type).
@external(javascript, "./chain.ffi.mjs", "write")
pub fn write(prev: Chainable(a), text: String) -> Chainable(a)
