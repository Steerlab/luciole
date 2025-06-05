import luciole/args
import luciole/leaf.{type Chain, CypressFunction}

pub fn get(selector: String) -> Chain {
  CypressFunction("get", [args.format_string(selector)])
  |> leaf.Instruct
  |> leaf.One
}

pub fn visit(path: String) -> Chain {
  CypressFunction("visit", [args.format_string(path)])
  |> leaf.Instruct
  |> leaf.One
}

pub fn contains(content: String) -> Chain {
  CypressFunction("contains", [args.format_string(content)])
  |> leaf.Instruct
  |> leaf.One
}
