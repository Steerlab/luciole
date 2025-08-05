import luciole.{after, after_each, before, before_each, describe, it}
import luciole/chain
import luciole/cypress as cy
import luciole/should

pub fn describe_cy() {
  describe("project", [
    before("go to Traversal page", fn() {
      cy.visit("https://example.cypress.io/commands/traversal")
      cy.get("h1") |> should.contain("Traversal")
    }),
    before_each("go to Cypress example page", fn() {
      cy.visit("https://example.cypress.io")
    }),
    after_each("is the same the same page", fn() {
      cy.wrap({ 2 + 2 }) |> should.equal(4)
    }),
    after("has the correct title", fn() {
      cy.get("h1") |> should.contain("Kitchen Sink")
    }),
    it("has the title Kitchen", fn() {
      cy.get("h1") |> should.contain("Kitchen")
    }),
    it("check that it contains Kitchen", fn() {
      should.contain(cy.get("body"), "Kitchen")
      cy.get("body") |> should.contain("Kitchen")
      cy.get("body") |> chain.contain("Kitchen")
      cy.contain("Kitchen")
      cy.get("body") |> should.be_visible()
    }),
  ])
}
