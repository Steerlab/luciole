import luciole.{type Chainable}

@external(javascript, "./should.ffi.mjs", "be_greater_than")
pub fn be_greater_than(prev: Chainable(a), val: a) -> Chainable(a)

@external(javascript, "./should.ffi.mjs", "be_less_than")
pub fn be_less_than(prev: Chainable(a), val: a) -> Chainable(a)

@external(javascript, "./should.ffi.mjs", "be_visible")
pub fn be_visible(prev: Chainable(a)) -> Chainable(a)

@external(javascript, "./should.ffi.mjs", "callback")
pub fn callback(prev: Chainable(a), next: fn(a) -> b) -> Chainable(a)

@external(javascript, "./should.ffi.mjs", "contain")
pub fn contain(prev: Chainable(a), content content: a) -> Chainable(a)

@external(javascript, "./should.ffi.mjs", "equal")
pub fn equal(prev: Chainable(a), val: a) -> Chainable(a)

@external(javascript, "./should.ffi.mjs", "have_class")
pub fn have_class(prev: Chainable(a), class: string) -> Chainable(a)

@external(javascript, "./should.ffi.mjs", "have_prop")
pub fn have_prop(prev: Chainable(a), prop: string) -> Chainable(a)

@external(javascript, "./should.ffi.mjs", "have_value")
pub fn have_value(prev: Chainable(a), val: a) -> Chainable(a)
