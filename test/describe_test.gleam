import luciole.{after, after_each, before, before_each, describe, it}
import luciole/cy
import luciole/should

pub fn it_test() {
  it("Goes to root", [cy.visit("/")])
}

pub fn describe_test() {
  describe("example_project", [
    describe("2 + 2 - 1", [it("= 3", [2 + 2 - 1 |> should.equal(3)])]),
  ])
}

pub fn more_describe_test() {
  describe("example_project", [
    describe("sums", [
      it("1 + 1 = 2", [1 + 1 |> should.equal(2)]),
      it("2 + 2 = 4", [2 + 2 |> should.equal(4)]),
    ]),
  ])
}

pub fn hook_test() {
  describe("5 + 0", [
    before([2 |> should.equal(2)]),
    before_each([2 |> should.equal(2)]),
    after([2 |> should.equal(2)]),
    after_each([2 |> should.equal(2)]),
    it("= 5", [5 + 0 |> should.equal(5)]),
  ])
}

pub fn auth_token_test() {
  describe("Auth0", [
    before_each([2 |> should.equal(2)]),
    it("shows onboarding", [
      cy.visit("/"),
      cy.get("[data-cy=\"catchphrase\"]"),
      // |> should.be_visible(),
    ]),
  ])
}
