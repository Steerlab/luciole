import luciole/types.{type Chainable}

@target(javascript)
@external(javascript, "./cypress.ffi.mjs", "visit")
pub fn visit(url: String) -> Nil

@target(javascript)
@external(javascript, "./cypress.ffi.mjs", "get")
pub fn get(selector: String) -> Chainable

@target(javascript)
@external(javascript, "./cypress.ffi.mjs", "find")
pub fn find(prev: Chainable, selector: String) -> Chainable

@target(javascript)
@external(javascript, "./cypress.ffi.mjs", "contains")
pub fn contains(content: String) -> Chainable
