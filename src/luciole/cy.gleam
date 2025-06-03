import luciole/args
import luciole/leaf.{type CypressFunction, type Step, CypressFunction}

pub fn get(selector: String) -> Step {
  CypressFunction("get", [args.format_string(selector)]) |> leaf.Instruct
}

pub fn visit(path: String) -> Step {
  CypressFunction("visit", [args.format_string(path)]) |> leaf.Instruct
}

pub fn contains(content: String) -> Step {
  CypressFunction("contains", [args.format_string(content)]) |> leaf.Instruct
}
