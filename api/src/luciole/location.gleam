import luciole.{type Chainable}

pub type Key {
  Hash
  Host
  Hostname
  Href
  Origin
  Pathname
  Port
  Protocol
  Search
  SuperDomain
  SuperDomainOrigin
}

fn key_to_string(key: Key) {
  case key {
    Hash -> "hash"
    Host -> "host"
    Hostname -> "hostname"
    Href -> "href"
    Origin -> "origin"
    Pathname -> "pathname"
    Port -> "port"
    Protocol -> "protocol"
    Search -> "search"
    SuperDomain -> "superDomain"
    SuperDomainOrigin -> "superDomainOrigin"
  }
}

@external(javascript, "./location.ffi.mjs", "loc_get")
pub fn get() -> Chainable(a)

pub fn get_key(key: Key) -> Chainable(String) {
  key_to_string(key) |> ext_get_key
}

@external(javascript, "./location.ffi.mjs", "loc_get_key")
fn ext_get_key(key: String) -> Chainable(String)
