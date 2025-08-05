import luciole.{it}
import luciole/cypress as cy

pub fn it_cy() {
  it("visits the kitchen", fn() {
    cy.visit("https://example.cypress.io")
    cy.contain("Kitchen")
  })
}
