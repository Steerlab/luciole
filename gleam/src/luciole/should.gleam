import luciole/types.{type Chainable}

@target(javascript)
@external(javascript, "./should.ffi.mjs", "be_less_than")
pub fn be_greater_than(prev: Chainable(a), val: a) -> Chainable(a)

@target(javascript)
@external(javascript, "./should.ffi.mjs", "be_less_than")
pub fn be_less_than(prev: Chainable(a), val: a) -> Chainable(a)

@target(javascript)
@external(javascript, "./should.ffi.mjs", "be_visible")
pub fn be_visible(prev: Chainable(a)) -> Chainable(a)

@target(javascript)
@external(javascript, "./should.ffi.mjs", "contain")
pub fn contain(prev: Chainable(a), content content: a) -> Chainable(a)

@target(javascript)
@external(javascript, "./should.ffi.mjs", "equal")
pub fn equal(prev: Chainable(a), val: a) -> Chainable(a)

@target(javascript)
@external(javascript, "./should.ffi.mjs", "have_value")
pub fn have_value(prev: Chainable(a), val: a) -> Chainable(a)
