import luciole.{type Chainable}

/// Get the DOM element containing at least the text.
///
/// Yields the new DOM element found.
///
/// See [Cypress Documentation - contains](https://docs.cypress.io/api/commands/contains).
@external(javascript, "./cypress.ffi.mjs", "contain")
pub fn contain(selector: String) -> Chainable(a)

/// Execute a system command.
///
/// Yields an object with the following properties:
/// `code`
/// `stdout`
/// `stderr`
///
/// See [Cypress Documentation - exec](https://docs.cypress.io/api/commands/exec).
@external(javascript, "./cypress.ffi.mjs", "exec")
pub fn exec(command: String) -> Chainable(a)

/// Get one or more DOM elements by selector.
///
/// Yields the new DOM element(s) found.
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
/// See [Cypress Documentation - get](https://docs.cypress.io/api/commands/get).
@external(javascript, "./cypress.ffi.mjs", "get")
pub fn get(selector: String) -> Chainable(a)

/// Visit a remote URL.
///
/// Yields the window object after the page finishes loading.
/// Unsafe to chain further commands that rely on the yielded window.
///
/// See [Cypress Documentation - visit](https://docs.cypress.io/api/commands/visit).
@external(javascript, "./cypress.ffi.mjs", "visit")
pub fn visit(url: String) -> Chainable(Nil)

/// Wrap an object into a Chainable.
///
/// Yields the subject it was given.
///
/// See [Cypress Documentation - wrap](https://docs.cypress.io/api/commands/wrap).
@external(javascript, "./cypress.ffi.mjs", "wrap")
pub fn wrap(subject: a) -> Chainable(a)
