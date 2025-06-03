import luciole/leaf.{type Body, type CypressFunction, CypressFunction}

pub fn get(selector: String) -> Body {
  CypressFunction("get", [selector]) |> leaf.Instruct
}

pub fn visit(path: String) -> Body {
  CypressFunction("visit", [path]) |> leaf.Instruct
}

pub fn contains(content: String) -> Body {
  CypressFunction("contains", [content]) |> leaf.Instruct
}
