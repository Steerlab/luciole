import describe_test
import gleam/io
import gleam/list
import luciole

pub fn main() {
  all_tests()
}

pub fn simple_test() {
  io.println("")

  describe_test.it_tests()
  |> luciole.to_cypress_code
  |> io.println
}

pub fn all_tests() {
  let tests_fun = [
    describe_test.it_tests,
    describe_test.describe_tests,
    describe_test.more_describe_tests,
    describe_test.hook_tests,
  ]

  list.map(tests_fun, with: fn(f) {
    f() |> luciole.to_cypress_code |> io.println
    io.println("")
  })
}
