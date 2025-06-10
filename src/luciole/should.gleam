pub fn contain(_prev: Nil, content _content: b) -> Nil {
  Nil
}

pub fn contains(_prev: Nil, content _content: b) -> Nil {
  Nil
}

pub fn include(_prev: Nil, content _content: b) -> Nil {
  Nil
}

pub fn includes(_prev: Nil, content _content: b) -> Nil {
  Nil
}

pub fn be_visible(_prev: Nil) -> Nil {
  Nil
}

pub fn method_to_chai(label: String) -> String {
  case label {
    "contain" | "contains" | "include" -> "contain"
    "be_visible" -> "be.visible"
    _ -> panic as "Error: unimplemented should method"
  }
}
