import luciole/types.{type Chainable}

pub fn contain(_prev: Chainable, content _content: b) -> Nil {
  Nil
}

pub fn be_visible(_prev: Chainable) -> Nil {
  Nil
}

pub fn method_to_cy(label: String) -> String {
  case label {
    "contain" -> "contain"
    "be_visible" -> "be.visible"
    _ -> panic as "Error: unimplemented should method"
  }
}
