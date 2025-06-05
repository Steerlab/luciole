import glance
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
  pprint.debug(code)
  let assert Ok(parsed) = glance.module(code)
  pprint.debug(parsed.functions)
}
