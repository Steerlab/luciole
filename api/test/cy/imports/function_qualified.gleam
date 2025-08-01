import luciole.{describe as lu_describe, it as lu_it}
import luciole/cypress.{get as lu_get, visit as lu_visit}
import luciole/should.{contain as lu_contain}

pub fn example_cy() {
  lu_describe("example", [
    lu_it("does this", fn() {
      lu_visit("https://example.cypress.io")
      lu_get("h1") |> lu_contain("Kitchen Sink")
    }),
  ])
}
