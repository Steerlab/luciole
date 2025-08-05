import luciole.{describe, describe_skip, it}
import luciole/cypress as cy

pub fn test_cy() {
  describe("outer describe", [
    describe_skip("inner describe 1 (skip)", [
      it("check the kitchen 1", fn() {
        cy.visit("https://example.cypress.io")
        cy.contain("Kitchen")
      }),
    ]),
    describe("inner describe 2", [
      it("check the kitchen 2", fn() {
        cy.visit("https://example.cypress.io")
        cy.contain("Kitchen")
      }),
    ]),
  ])
}
