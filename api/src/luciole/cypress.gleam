import luciole.{type Chainable}

@external(javascript, "./cypress.ffi.mjs", "contain")
pub fn contain(content: String) -> Chainable(a)

@external(javascript, "./cypress.ffi.mjs", "exec")
pub fn exec(command: String) -> a

@external(javascript, "./cypress.ffi.mjs", "get")
pub fn get(selector: String) -> Chainable(a)

@external(javascript, "./cypress.ffi.mjs", "visit")
pub fn visit(url: String) -> Chainable(Nil)

@external(javascript, "./cypress.ffi.mjs", "wrap")
pub fn wrap(subject: a) -> Chainable(a)
