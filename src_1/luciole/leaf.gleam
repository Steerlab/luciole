import gleam/dynamic.{type Dynamic}
import gleam/list
import gleam/string
import luciole/code

pub type TestCase {
  TestCase(name: String, body: Body, skipped: Bool)
}

pub type Hook {
  Before(Body)
  BeforeEach(Body)
  After(Body)
  AfterEach(Body)
}

pub type Body =
  List(Chain)

pub type Chain {
  One(Step)
  Multiple(Step, followed_by: Chain)
}

pub type Step {
  Instruct(CypressFunction)
  Assert(Should)
}

pub type Should {
  Should(actual: Dynamic, name: String, args: List(Dynamic))
}

pub type Expect {
  Expect(actual: Dynamic, name: String, args: List(Dynamic))
}

pub type CypressFunction {
  CypressFunction(name: String, args: List(String))
}

pub fn test_to_cypress_code(test_case: TestCase) -> List(String) {
  let TestCase(name:, body:, skipped:) = test_case
  let skipped = case skipped {
    True -> ".skip"
    False -> ""
  }
  list.flatten([
    ["it" <> skipped <> "('" <> name <> "', function () {"],
    code.indent(body_to_cypress_test(body)),
    ["})"],
  ])
}

pub fn hook_to_cypress_code(hook: Hook) -> List(String) {
  let #(hook, body) = case hook {
    Before(body) -> #("before", body)
    BeforeEach(body) -> #("beforeEach", body)
    After(body) -> #("after", body)
    AfterEach(body) -> #("afterEach", body)
  }
  list.flatten([
    [hook <> "(function () {"],
    code.indent(body_to_cypress_test(body)),
    ["})"],
  ])
}

fn body_to_cypress_test(body: Body) -> List(String) {
  case body {
    [] -> []
    [chain, ..tail] ->
      list.flatten([chain_to_cypress_test(chain), body_to_cypress_test(tail)])
  }
}

fn chain_to_cypress_test(chain: Chain) -> List(String) {
  // TODO: add cy. at begining of chains
  // ["cy.", ..code.indent(rec_chain(chain))]
  rec_chain(chain)
}

fn rec_chain(chain: Chain) {
  case chain {
    One(step) -> step_to_cypress_test(step)
    Multiple(step, followed_by) ->
      list.flatten([step_to_cypress_test(step), rec_chain(followed_by)])
  }
}

fn step_to_cypress_test(step: Step) -> List(String) {
  case step {
    Instruct(cy_fun) -> cy_fun_to_cypress_code(cy_fun)
    Assert(_fun) -> ["expect()"]
  }
}

fn cy_fun_to_cypress_code(fun: CypressFunction) -> List(String) {
  let CypressFunction(name, args) = fun
  let args = args |> string.join(", ")
  ["cy." <> name <> "(" <> args <> ")"]
}
