import gleam/list

pub fn indent(code: List(String)) -> List(String) {
  code |> list.map(fn(c) { "  " <> c })
}
