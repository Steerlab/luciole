import luciole.{describe, it}
import luciole/cypress.{get, visit}
import luciole/should.{contain}

pub fn example_cy() {
  describe("example", [
    it("does this", fn() {
      visit("https://example.cypress.io")
      get("h1") |> contain("Kitchen Sink")
    }),
  ])
}
