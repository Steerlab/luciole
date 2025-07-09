import luciole.{describe, it}
import luciole/cypress as cy

pub fn complex_describe_it_test() {
  // before(fn() { todo })
  // before_each(fn() { todo })
  // after_each(fn() { todo })
  // after(fn() { todo })
  describe("outer describe", [visits_the_kitchen(), dummy()])
}

fn visits_the_kitchen() {
  it("visits the kitchen", fn() {
    cy.visit("https://example.cypress.io")
    cy.contains("Kitchen")
  })
}

fn dummy() {
  describe("inner describe", [
    it("visits utilites", fn() {
      cy.visit("https://example.cypress.io/utilities")
      cy.contains("Utilities")
    }),
  ])
}
