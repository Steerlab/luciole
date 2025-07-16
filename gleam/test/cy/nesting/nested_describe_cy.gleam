import luciole.{describe, it}
import luciole/cypress as cy

pub fn nested_describe_cy() {
  describe("outer describe", [
    describe("inner describe", [
      it("visits the kitchen", fn() {
        cy.visit("https://example.cypress.io")
        cy.contains("Kitchen")
      }),
    ]),
  ])
}
