import glance
import gleam/list
import gleam/string
import luciole/code
import pprint
import simplifile

type Body =
  fn() -> Nil

pub fn it(_name: String, body: Body) {
  body
}

pub fn describe(_name: String, suite: List(Body)) {
  suite
}

pub fn get_ast(filepath: String) {
  let assert Ok(code) = simplifile.read(from: filepath)
  let assert Ok(parsed) = glance.module(code)
  pprint.debug(pprint(parsed))
}

pub fn pprint(parsed: glance.Module) -> String {
  parsed.functions
  |> list.map(fn(definition) { pprint_function(definition.definition) })
  |> list.flatten
  |> string.join("\n")
}

pub fn pprint_function(fun: glance.Function) -> List(String) {
  fun.body
  |> list.map(fn(statement) { pprint_statement(statement) })
  |> list.flatten
}

pub fn pprint_statement(statement: glance.Statement) -> List(String) {
  case statement {
    glance.Expression(glance.Call(
      _location,
      glance.Variable(_location2, "describe"),
      [glance.UnlabelledField(glance.String(_location3, name)), ..],
    )) ->
      list.flatten([
        ["describe('" <> name <> "', ["],
        code.indent(["TODO"]),
        ["]"],
      ])
    _ -> ["TODO"]
  }
}
