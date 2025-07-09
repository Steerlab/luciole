import luciole.{describe, it}
import luciole/cypress as cy

pub fn complex_describe_it_test() {
  describe("outer describe", [
    it("visits the kitchen", fn() {
      cy.visit("https://example.cypress.io")
      cy.contains("Kitchen")
    }),
    describe("inner describe", [
      it("visits utilites", fn() {
        cy.visit("https://example.cypress.io/utilities")
        cy.contains("Utilities")
      }),
    ]),
  ])
}
