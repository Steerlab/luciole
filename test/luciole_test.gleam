import describe_test
import gleam/io
import luciole

// import gleeunit/should
//
// 1
// |> should.equal(1)

pub fn main() {
  simple_test()
}

pub fn simple_test() {
  io.println("")

  describe_test.describe_tests()
  |> luciole.to_cypress_code
  |> io.println
}
