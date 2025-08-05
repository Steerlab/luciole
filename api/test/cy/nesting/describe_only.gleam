import luciole.{describe, describe_only, it}
import luciole/cypress as cy

pub fn test_cy() {
  describe("outer describe", [
    describe_only("inner describe 1 (only)", [
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
