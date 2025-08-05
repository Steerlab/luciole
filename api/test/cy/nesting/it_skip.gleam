import luciole.{describe, it, it_skip}
import luciole/cypress as cy

pub fn test_cy() {
  describe("outer describe", [
    it_skip("visits the kitchen 1 (skip)", fn() {
      cy.visit("https://example.cypress.io")
      cy.contain("Kitchen")
    }),
    it("visits the kitchen 2", fn() {
      cy.visit("https://example.cypress.io")
      cy.contain("Kitchen")
    }),
  ])
}
