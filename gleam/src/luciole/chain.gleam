import luciole/types.{type Body, type Chainable}

@target(javascript)
@external(javascript, "./chain.ffi.mjs", "attach_file")
pub fn attach_file(prev: Chainable, filepath: String) -> Chainable

@target(javascript)
@external(javascript, "./chain.ffi.mjs", "click")
pub fn click(prev: Chainable) -> Chainable

@target(javascript)
@external(javascript, "./chain.ffi.mjs", "contains")
pub fn contains(prev: Chainable, content: String) -> Chainable

@target(javascript)
@external(javascript, "./chain.ffi.mjs", "each")
pub fn each(prev: Chainable, fun: fn(a) -> b) -> Chainable

@target(javascript)
@external(javascript, "./chain.ffi.mjs", "find")
pub fn find(prev: Chainable, selector: String) -> Chainable

@target(javascript)
@external(javascript, "./chain.ffi.mjs", "invoke")
pub fn invoke(prev: Chainable, function_name: String) -> Chainable

@target(javascript)
@external(javascript, "./chain.ffi.mjs", "then")
pub fn then(prev: Chainable, body: Body) -> Chainable

@target(javascript)
@external(javascript, "./chain.ffi.mjs", "type_")
pub fn type_(prev: Chainable, text: String) -> Chainable

@target(javascript)
@external(javascript, "./chain.ffi.mjs", "within")
pub fn within(prev: Chainable, body: Body) -> Chainable
