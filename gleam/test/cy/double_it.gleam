import luciole.{describe, it}
import luciole/cypress as cy

pub fn double_it_cy() {
  describe("example", [
    it("does this", fn() {
      cy.visit("https://example.cypress.io/commands/traversal")
    }),
    it("does that", fn() {
      cy.visit("https://example.cypress.io/commands/traversal")
    }),
  ])
}
