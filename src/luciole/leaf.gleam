import gleam/list
import luciole/code

pub type CypressFunction {
  CypressFunction(name: String, args: List(String))
}

pub type Body {
  Instruct(CypressFunction)
  Expect(fn() -> Bool)
}

pub type TestCase {
  TestCase(name: String, body: Body, skipped: Bool)
}

pub type Hook {
  Before(Body)
  BeforeEach(Body)
  After(Body)
  AfterEach(Body)
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

fn body_to_cypress_test(_body: Body) -> List(String) {
  ["body"]
}
