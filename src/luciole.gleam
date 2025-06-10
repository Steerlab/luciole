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
    _ -> ["TODO_1"]
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
      [glance.UnlabelledField(glance.String(_location3, name)), ..args],
    ) ->
      list.flatten([
        ["it('" <> name <> "', function() {"],
        code.indent(pprint_args(args)),
        ["})"],
      ])
    glance.List(_location, elements, _rest) -> {
      elements |> list.map(pprint_expression) |> list.flatten
    }

    glance.Call(
      _location,
      glance.FieldAccess(_location2, glance.Variable(_location3, "cy"), label),
      args,
    ) ->
      list.flatten([
        ["cy." <> label <> "("],
        code.indent(pprint_args(args)),
        [")"],
      ])

    glance.Call(
      _location,
      glance.FieldAccess(
        _location2,
        glance.Variable(_location3, "should"),
        label,
      ),
      args,
    ) -> pprint_should(label, args)

    glance.Fn(_location, _arguments, _return_annotation, body) ->
      body |> list.map(pprint_statement) |> list.flatten

    glance.String(_location, s) -> ["'" <> s <> "'"]

    e -> {
      pprint.debug(e)
      ["TODO_3"]
    }
  }
}

fn pprint_args(args: List(glance.Field(glance.Expression))) {
  args |> list.map(fn(arg) { pprint_field(arg) }) |> list.flatten
}

fn pprint_field(field: glance.Field(glance.Expression)) {
  case field {
    glance.UnlabelledField(expression) -> {
      pprint_expression(expression)
    }
    _ -> ["TODO_4"]
  }
}

fn pprint_should(
  label: String,
  args: List(glance.Field(glance.Expression)),
) -> List(String) {
  // valid if every should.function() takes at least one argument
  let assert [prev, ..args] = args

  let args =
    list.flatten([
      [".should("],
      code.indent(["'" <> label <> "', "]),
      code.indent(pprint_args(args)),
      [")"],
    ])
  list.flatten([pprint_field(prev), code.indent(args)])
}
