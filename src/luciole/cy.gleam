import luciole/leaf.{type CypressFunction, type Step, CypressFunction}

pub fn get(selector: String) -> Step {
  CypressFunction("get", [selector]) |> leaf.Instruct
}

pub fn visit(path: String) -> Step {
  CypressFunction("visit", [path]) |> leaf.Instruct
}

pub fn contains(content: String) -> Step {
  CypressFunction("contains", [content]) |> leaf.Instruct
}
