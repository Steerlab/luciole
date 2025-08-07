import luciole.{before_each, describe, describe_only, it, it_only}
import luciole/cypress as cy

pub fn test_cy() {
  describe("outer describe", [
    before_each("visit the Kitchen", fn() {
      cy.visit("https://example.cypress.io")
    }),
    describe_only("a. inner describe.only", [
      it_only("1. it.only", fn() { cy.contain("Kitchen") }),
      it_only("2. it.only", fn() { cy.contain("Kitchen") }),
      it("3. it", fn() { cy.contain("Kitchen") }),
    ]),
    describe_only("b. inner describe.only", [
      it_only("1. it.only", fn() { cy.contain("Kitchen") }),
      it_only("2. it.only", fn() { cy.contain("Kitchen") }),
      it("3. it", fn() { cy.contain("Kitchen") }),
    ]),
    describe("c. inner describe with it.only", [
      it_only("1. it.only", fn() { cy.contain("Kitchen") }),
      it_only("2. it.only", fn() { cy.contain("Kitchen") }),
      it("3. it", fn() { cy.contain("Kitchen") }),
    ]),
    describe("c. inner describe without it.only", [
      it("3. it", fn() { cy.contain("Kitchen") }),
    ]),
  ])
}
