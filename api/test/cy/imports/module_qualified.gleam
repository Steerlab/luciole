import luciole as lu
import luciole/cypress as cy
import luciole/should as sh

pub fn example_cy() {
  lu.describe("example", [
    lu.it("does this", fn() {
      cy.visit("https://example.cypress.io")
      cy.get("h1") |> sh.contain("Kitchen Sink")
    }),
  ])
}
