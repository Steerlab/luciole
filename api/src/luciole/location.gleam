import gleam/dynamic
import luciole.{type Chainable}

/// Get the global window.location object of the page that is currently active.
///
/// Yields the location object with the following properties:
/// - `hash`
/// - `host`
/// - `hostname`
/// - `href`
/// - `origin`
/// - `pathname`
/// - `port`
/// - `protocol`
/// - `search`
/// - `toString`
///
/// See [Cypress Documentation - location](https://docs.cypress.io/api/commands/location).
@external(javascript, "./location.ffi.mjs", "get")
pub fn get() -> Chainable(dynamic.Dynamic)

/// Get the global window.location object of the page that is currently active.
///
/// Yields the location's hash string.
///
/// See [Cypress Documentation - location](https://docs.cypress.io/api/commands/location).
@external(javascript, "./location.ffi.mjs", "hash")
pub fn hash() -> Chainable(String)

/// Get the global window.location object of the page that is currently active.
///
/// Yields the location's host string.
///
/// See [Cypress Documentation - location](https://docs.cypress.io/api/commands/location).
@external(javascript, "./location.ffi.mjs", "host")
pub fn host() -> Chainable(String)

/// Get the global window.location object of the page that is currently active.
///
/// Yields the location's hostname string.
///
/// See [Cypress Documentation - location](https://docs.cypress.io/api/commands/location).
@external(javascript, "./location.ffi.mjs", "hostname")
pub fn hostname() -> Chainable(String)

/// Get the global window.location object of the page that is currently active.
///
/// Yields the location's href string.
///
/// See [Cypress Documentation - location](https://docs.cypress.io/api/commands/location).
@external(javascript, "./location.ffi.mjs", "href")
pub fn href() -> Chainable(String)

/// Get the global window.location object of the page that is currently active.
///
/// Yields the location's origin string.
///
/// See [Cypress Documentation - location](https://docs.cypress.io/api/commands/location).
@external(javascript, "./location.ffi.mjs", "origin")
pub fn origin() -> Chainable(String)

/// Get the global window.location object of the page that is currently active.
///
/// Yields the location's pathname string.
///
/// See [Cypress Documentation - location](https://docs.cypress.io/api/commands/location).
@external(javascript, "./location.ffi.mjs", "pathname")
pub fn pathname() -> Chainable(String)

/// Get the global window.location object of the page that is currently active.
///
/// Yields the location's port string.
///
/// See [Cypress Documentation - location](https://docs.cypress.io/api/commands/location).
@external(javascript, "./location.ffi.mjs", "port")
pub fn port() -> Chainable(String)

/// Get the global window.location object of the page that is currently active.
///
/// Yields the location's protocol string.
///
/// See [Cypress Documentation - location](https://docs.cypress.io/api/commands/location).
@external(javascript, "./location.ffi.mjs", "protocol")
pub fn protocol() -> Chainable(String)

/// Get the global window.location object of the page that is currently active.
///
/// Yields the location's search string.
///
/// See [Cypress Documentation - location](https://docs.cypress.io/api/commands/location).
@external(javascript, "./location.ffi.mjs", "search")
pub fn search() -> Chainable(String)

/// Get the global window.location object of the page that is currently active.
///
/// Yields the location's super domain string.
///
/// See [Cypress Documentation - location](https://docs.cypress.io/api/commands/location).
@external(javascript, "./location.ffi.mjs", "super_domain")
pub fn super_domain() -> Chainable(String)

/// Get the global window.location object of the page that is currently active.
///
/// Yields the location's super domain origin string.
///
/// See [Cypress Documentation - location](https://docs.cypress.io/api/commands/location).
@external(javascript, "./location.ffi.mjs", "super_domain_origin")
pub fn super_domain_origin() -> Chainable(String)
