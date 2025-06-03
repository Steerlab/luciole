import luciole.{after, after_each, before, before_each, describe, expect, it}
import luciole/cy
import luciole/expect

pub fn it_tests() {
  it("Visits /", cy.visit("/"))
}

pub fn describe_tests() {
  describe("example_project", [
    describe("2 + 2 - 1", [
      it(
        "= 3",
        expect(fn() {
          2 + 2 - 1
          |> expect.to_equal(3)
        }),
      ),
    ]),
  ])
}

pub fn more_describe_tests() {
  describe("example_project", [
    describe("2 + 2", [
      it(
        "= 2",
        expect(fn() {
          1 + 1
          |> expect.to_equal(2)
        }),
      ),
      it(
        "= 4",
        expect(fn() {
          2 + 2
          |> expect.to_equal(4)
        }),
      ),
    ]),
  ])
}

pub fn hook_tests() {
  describe("5 + 0", [
    before(expect(fn() { 1 + 1 |> expect.to_equal(2) })),
    before_each(expect(fn() { 1 + 1 |> expect.to_equal(2) })),
    after(expect(fn() { 1 + 1 |> expect.to_equal(2) })),
    after_each(expect(fn() { 1 + 1 |> expect.to_equal(2) })),
    it("= 5", expect(fn() { 5 + 0 |> expect.to_equal(5) })),
  ])
}
