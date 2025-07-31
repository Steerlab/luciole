import luciole
import luciole/cypress

pub fn double_it_cy() {
  luciole.describe("example", [
    luciole.it("does this", fn() {
      cypress.visit("https://example.cypress.io/commands/traversal")
    }),
    luciole.it("does that", fn() {
      cypress.visit("https://example.cypress.io/commands/traversal")
    }),
  ])
}
