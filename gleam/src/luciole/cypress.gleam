import luciole/types.{type Chainable}

@target(javascript)
@external(javascript, "./cypress.ffi.mjs", "contains")
pub fn contains(content: String) -> Chainable

@target(javascript)
@external(javascript, "./cypress.ffi.mjs", "exec")
pub fn exec(command: String) -> Chainable

@target(javascript)
@external(javascript, "./cypress.ffi.mjs", "get")
pub fn get(selector: String) -> Chainable

@target(javascript)
@external(javascript, "./cypress.ffi.mjs", "location")
pub fn location() -> Chainable

@target(javascript)
@external(javascript, "./cypress.ffi.mjs", "visit")
pub fn visit(url: String) -> Chainable

@target(javascript)
@external(javascript, "./cypress.ffi.mjs", "wrap")
pub fn wrap(subject: a) -> Chainable
