import luciole.{describe, it}
import luciole/cy
import luciole/should

// pub fn it_test() {
//   it("does nothing", fn() { Nil })
// }

pub fn describe_test() {
  describe("project", [
    it("goes to Cypress example page", fn() {
      cy.visit("https://example.cypress.io")
      should.include(cy.get("body"), "Kitchen")
      cy.get("body") |> should.include("Kitchen")
      cy.get("body") |> should.be_visible()
    }),
  ])
}
