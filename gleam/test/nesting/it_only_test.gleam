import luciole.{it}
import luciole/cypress as cy

pub fn it_only_test() {
  it("visits the kitchen", fn() {
    cy.visit("https://example.cypress.io")
    cy.contains("Kitchen")
  })
}
