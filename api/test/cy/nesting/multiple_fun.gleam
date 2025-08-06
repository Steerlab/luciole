import luciole.{describe, it}
import luciole/cypress as cy

pub fn complex_describe_it_cy() {
  describe("outer describe", [
    it("goes to the Kitchen", fn() { kitchen() }),
    it("goes to Utilities", fn() { utilities() }),
  ])
}

fn kitchen() {
  cy.visit("https://example.cypress.io")
  cy.contain("Kitchen")
}

fn utilities() {
  cy.visit("https://example.cypress.io/utilities")
  cy.contain("Utilities")
}
