import luciole.{describe, it}
import luciole/cypress as cy
import luciole/should

@target(javascript)
pub fn describe_test() {
  describe("project", [
    it("goes to Cypress example page", fn() {
      cy.visit("https://example.cypress.io")
      should.contain(cy.get("body"), "Kitchen")
      cy.get("body") |> should.contain("Kitchen")
      cy.get("body") |> should.be_visible()
      cy.contains("Kitchen")
      Nil
    }),
  ])
}
