import luciole/types.{type Chainable}

@target(javascript)
@external(javascript, "./should.ffi.mjs", "contain")
pub fn contain(prev: Chainable, content content: b) -> Chainable

@target(javascript)
@external(javascript, "./should.ffi.mjs", "be_visible")
pub fn be_visible(prev: Chainable) -> Nil

@target(javascript)
@external(javascript, "./should.ffi.mjs", "be_less_than")
pub fn be_less_than(prev: Chainable, val: Float) -> Nil

@target(javascript)
@external(javascript, "./should.ffi.mjs", "be_less_than")
pub fn be_greater_than(prev: Chainable, val: Float) -> Nil

@target(javascript)
@external(javascript, "./should.ffi.mjs", "equal")
pub fn equal(prev: Chainable, val: Float) -> Nil
