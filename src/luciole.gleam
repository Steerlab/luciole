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

fn pprint_function(fun: glance.Function) -> List(String) {
  fun.body
  |> list.map(fn(statement) { pprint_statement(statement) })
  |> list.flatten
}

fn pprint_statement(statement: glance.Statement) -> List(String) {
  case statement {
    glance.Expression(expression) -> pprint_expression(expression)
    _ -> ["TODO"]
  }
}

fn pprint_expression(expression: glance.Expression) -> List(String) {
  case expression {
    glance.Call(
      _location,
      glance.Variable(_location2, "describe"),
      [glance.UnlabelledField(glance.String(_location3, name)), ..args],
    ) -> {
      list.flatten([
        ["describe('" <> name <> "', ["],
        code.indent(pprint_args(args)),
        ["])"],
        [""],
      ])
    }
    glance.Call(
      _location,
      glance.Variable(_location2, "it"),
      [glance.UnlabelledField(glance.String(_location3, name)), ..],
    ) ->
      list.flatten([
        ["it('" <> name <> "', fn() {"],
        code.indent(["TODO"]),
        ["})"],
      ])
    glance.List(_location, elements, _rest) -> {
      elements |> list.map(pprint_expression) |> list.flatten
    }
    _ -> ["TODO"]
  }
}

fn pprint_args(args: List(glance.Field(glance.Expression))) {
  args |> list.map(fn(arg) { pprint_arg(arg) }) |> list.flatten
}

fn pprint_arg(arg: glance.Field(glance.Expression)) {
  case arg {
    glance.UnlabelledField(expression) -> {
      pprint_expression(expression)
    }
    _ -> ["TODO"]
  }
}
