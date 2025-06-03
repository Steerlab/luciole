import luciole.{after, after_each, before, before_each, describe, expect, it}
import luciole/cy
import luciole/expect

pub fn it_test() {
  it("Goes to root", [cy.visit("/")])
}

pub fn describe_test() {
  describe("example_project", [
    describe("2 + 2 - 1", [
      it("= 3", [
        expect(fn() {
          2 + 2 - 1
          |> expect.to_equal(3)
        }),
      ]),
    ]),
  ])
}

pub fn more_describe_test() {
  describe("example_project", [
    describe("2 + 2", [
      it("= 2", [
        expect(fn() {
          1 + 1
          |> expect.to_equal(2)
        }),
      ]),
      it("= 4", [
        expect(fn() {
          2 + 2
          |> expect.to_equal(4)
        }),
      ]),
    ]),
  ])
}

pub fn hook_test() {
  describe("5 + 0", [
    before([expect(fn() { True })]),
    before_each([expect(fn() { True })]),
    after([expect(fn() { True })]),
    after_each([expect(fn() { True })]),
    it("= 5", [expect(fn() { 5 + 0 |> expect.to_equal(5) })]),
  ])
}

pub fn auth_token_test() {
  describe("Auth0", [
    before_each([expect(fn() { True })]),
    it("shows onboarding", [cy.visit("/"), cy.get("[data-cy=\"catchphrase\"]")]),
  ])
}
