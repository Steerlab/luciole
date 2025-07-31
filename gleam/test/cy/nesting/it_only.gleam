import luciole.{describe, it, it_only}
import luciole/cypress as cy

pub fn test_cy() {
  describe("outer describe", [
    it_only("visits the kitchen 1 (only)", fn() {
      cy.visit("https://example.cypress.io")
      cy.contains("Kitchen")
    }),
    it("visits the kitchen 2", fn() {
      cy.visit("https://example.cypress.io")
      cy.contains("Kitchen")
    }),
  ])
}
