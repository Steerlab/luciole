import luciole.{describe, it}
import luciole/cypress as cy
import luciole/location as loc
import luciole/should

pub fn test_cy() {
  describe("let's test the location", [
    luciole.before_each("visit the page", fn() {
      cy.visit("https://example.cypress.io/commands/traversal")
    }),
    it("tests the location.get function", fn() {
      loc.get()
      |> should.callback(fn(_location) {
        // We could make a location type and decoder to access its attributes
        True
      })
    }),
    it("tests the other location functions", fn() {
      loc.hash() |> should.equal("")
      loc.host() |> should.equal("example.cypress.io")
      loc.hostname() |> should.equal("example.cypress.io")
      loc.href()
      |> should.equal("https://example.cypress.io/commands/traversal")
      loc.origin() |> should.equal("https://example.cypress.io")
      loc.pathname() |> should.equal("/commands/traversal")
      loc.port() |> should.equal("")
      loc.protocol() |> should.equal("https:")
      loc.search() |> should.equal("")
      loc.super_domain() |> should.equal("cypress.io")
      loc.super_domain_origin()
      |> should.equal("https://cypress.io")
    }),
  ])
}
