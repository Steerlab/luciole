import luciole.{describe, it}
import luciole/cy
import luciole/expect
import luciole/should

pub fn describe_test() {
  describe("project", [
    it("goes to Cypress example page", fn() {
      cy.visit("https://example.cypress.io")
      should.contain(cy.get("body"), "Kitchen")
      cy.get("body") |> should.contain("Kitchen")
      cy.get("body") |> should.be_visible()
      expect.to_be_true(True)
    }),
  ])
}
