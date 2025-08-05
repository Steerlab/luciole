import luciole
import luciole/chain
import luciole/cypress as cy
import luciole/should

pub fn ex_cy() {
  luciole.describe("let's test should", [
    luciole.it("compares values", fn() {
      cy.wrap(3) |> should.be_greater_than(2)
      cy.wrap(2.8) |> should.be_less_than(3.1)
      cy.wrap("this") |> should.equal("this")
    }),
    luciole.it("asserts the state of the DOM", fn() {
      cy.visit("https://example.cypress.io")
      cy.get("h1") |> should.be_visible()
      cy.get("h1") |> should.have_prop("tagName") |> should.equal("H1")
      cy.get("h1") |> should.contain("Kitchen")
      cy.get("a")
      |> chain.contain("cypress.io")
      |> should.have_class("navbar-brand")
    }),
  ])
}
