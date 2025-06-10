import glance
import gleam/list
import gleam/string
import luciole/code
import luciole/expect
import luciole/should
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

pub fn make_test_file(at path: String, contents contents: String) -> Nil {
  case simplifile.create_file(path) {
    Ok(_) -> {
      let _ = simplifile.write(to: path, contents: contents)
      Nil
    }
    Error(_) -> {
      echo "File " <> path <> " already exists. Please delete it."
      Nil
    }
  }
}

pub fn get_code(filepath: String) {
  let assert Ok(code) = simplifile.read(from: filepath)
  code
}

pub fn pprint(code: String) -> String {
  let assert Ok(parsed) = glance.module(code)
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

    glance.BinaryOperator(
      _location,
      glance.Pipe,
      call,
      glance.Call(
        _location2,
        glance.FieldAccess(
          _location3,
          glance.Variable(_location3, "should"),
          label,
        ),
        args,
      ),
    ) -> pprint_should(label, [glance.UnlabelledField(call), ..args])

    glance.Call(
      _location,
      glance.FieldAccess(
        _location2,
        glance.Variable(_location3, "expect"),
        label,
      ),
      args,
    ) -> pprint_expect(label, args)

    glance.Fn(_location, _arguments, _return_annotation, body) ->
      body |> list.map(pprint_statement) |> list.flatten

    glance.String(_location, value) -> ["'" <> value <> "'"]

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
  method: String,
  args: List(glance.Field(glance.Expression)),
) -> List(String) {
  // valid if every should.function() takes at least one argument
  let assert [chainers, ..value] = args

  let should_args =
    list.flatten([
      [".should("],
      code.indent(["'" <> should.method_to_chai(method) <> "',"]),
      code.indent(pprint_args(value)),
      [")"],
    ])
  list.flatten([pprint_field(chainers), code.indent(should_args)])
}

fn pprint_expect(
  method: String,
  args: List(glance.Field(glance.Expression)),
) -> List(String) {
  list.flatten([
    ["expect("],
    code.indent(pprint_args(args)),
    [")." <> expect.method_to_chai(method)],
  ])
}
