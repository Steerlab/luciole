import luciole/types.{type Body, type Chainable}

@external(javascript, "./chain.ffi.mjs", "attach_file")
pub fn attach_file(prev: Chainable(a), filepath: String) -> Chainable(a)

@external(javascript, "./chain.ffi.mjs", "click")
pub fn click(prev: Chainable(a)) -> Chainable(a)

@external(javascript, "./chain.ffi.mjs", "contains")
pub fn contains(prev: Chainable(a), content: String) -> Chainable(b)

@external(javascript, "./chain.ffi.mjs", "each")
pub fn each(prev: Chainable(a), fun: fn(a) -> b) -> Chainable(a)

@external(javascript, "./chain.ffi.mjs", "find")
pub fn find(prev: Chainable(a), selector: String) -> Chainable(b)

@external(javascript, "./chain.ffi.mjs", "invoke")
pub fn invoke(prev: Chainable(a), function_name: String) -> Chainable(b)

@external(javascript, "./chain.ffi.mjs", "then")
pub fn then(prev: Chainable(a), body: fn(a) -> b) -> Chainable(a)

@external(javascript, "./chain.ffi.mjs", "type_")
pub fn type_(prev: Chainable(a), text: String) -> Chainable(a)

@external(javascript, "./chain.ffi.mjs", "within")
pub fn within(prev: Chainable(a), body: Body(b)) -> Chainable(a)
