import luciole.{after, after_each, before, before_each, describe, it}
import luciole/expect

pub fn it_tests() {
  it("True is true", fn() {
    True
    |> expect.to_be_true
  })
}

pub fn describe_tests() {
  describe("example_project", [
    describe("2 + 2 - 1", [
      it("= 3", fn() {
        2 + 2 - 1
        |> expect.to_equal(3)
      }),
    ]),
  ])
}

pub fn more_describe_tests() {
  describe("example_project", [
    describe("2 + 2", [
      it("= 2", fn() {
        1 + 1
        |> expect.to_equal(2)
      }),
      it("= 4", fn() {
        2 + 2
        |> expect.to_equal(4)
      }),
    ]),
  ])
}

pub fn hook_tests() {
  describe("5 + 0", [
    before(fn() { 1 + 1 |> expect.to_equal(2) }),
    before_each(fn() { 1 + 1 |> expect.to_equal(2) }),
    after(fn() { 1 + 1 |> expect.to_equal(2) }),
    after_each(fn() { 1 + 1 |> expect.to_equal(2) }),
    it("= 5", fn() { 5 + 0 |> expect.to_equal(5) }),
  ])
}
