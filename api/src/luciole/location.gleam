import gleam/dynamic
import luciole.{type Chainable}

@external(javascript, "./location.ffi.mjs", "get")
pub fn get() -> Chainable(dynamic.Dynamic)

@external(javascript, "./location.ffi.mjs", "hash")
pub fn hash() -> Chainable(String)

@external(javascript, "./location.ffi.mjs", "host")
pub fn host() -> Chainable(String)

@external(javascript, "./location.ffi.mjs", "hostname")
pub fn hostname() -> Chainable(String)

@external(javascript, "./location.ffi.mjs", "href")
pub fn href() -> Chainable(String)

@external(javascript, "./location.ffi.mjs", "origin")
pub fn origin() -> Chainable(String)

@external(javascript, "./location.ffi.mjs", "pathname")
pub fn pathname() -> Chainable(String)

@external(javascript, "./location.ffi.mjs", "port")
pub fn port() -> Chainable(String)

@external(javascript, "./location.ffi.mjs", "protocol")
pub fn protocol() -> Chainable(String)

@external(javascript, "./location.ffi.mjs", "search")
pub fn search() -> Chainable(String)

@external(javascript, "./location.ffi.mjs", "super_domain")
pub fn super_domain() -> Chainable(String)

@external(javascript, "./location.ffi.mjs", "super_domain_origin")
pub fn super_domain_origin() -> Chainable(String)
