import describe_test
import gleam/io
import gleam/list
import luciole

pub fn main() {
  io.println("")
  all_tests()
}

pub fn simple_test() {
  describe_test.it_test()
  |> luciole.to_cypress_code
  |> io.println
}

pub fn all_tests() {
  let test_funs = [
    describe_test.it_test,
    describe_test.describe_test,
    describe_test.more_describe_test,
    describe_test.hook_test,
    describe_test.auth_token_test,
  ]

  list.map(test_funs, with: fn(f) {
    f() |> luciole.to_cypress_code |> io.println
    io.println("")
  })
}
