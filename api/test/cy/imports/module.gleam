import luciole
import luciole/cypress
import luciole/should

pub fn example_cy() {
  luciole.describe("example", [
    luciole.it("does this", fn() {
      cypress.visit("https://example.cypress.io")
      cypress.get("h1") |> should.contain("Kitchen Sink")
    }),
  ])
}
