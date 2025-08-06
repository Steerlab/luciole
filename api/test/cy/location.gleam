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
        // Can't pick _location attributes yet...
        True
      })
    }),
    it("tests the loc.get_key function", fn() {
      loc.get_key(loc.Hash) |> should.equal("")
      loc.get_key(loc.Host) |> should.equal("example.cypress.io")
      loc.get_key(loc.Hostname) |> should.equal("example.cypress.io")
      loc.get_key(loc.Href)
      |> should.equal("https://example.cypress.io/commands/traversal")
      loc.get_key(loc.Origin) |> should.equal("https://example.cypress.io")
      loc.get_key(loc.Pathname) |> should.equal("/commands/traversal")
      loc.get_key(loc.Port) |> should.equal("")
      loc.get_key(loc.Protocol) |> should.equal("https:")
      loc.get_key(loc.Search) |> should.equal("")
      loc.get_key(loc.SuperDomain) |> should.equal("cypress.io")
      loc.get_key(loc.SuperDomainOrigin) |> should.equal("https://cypress.io")
    }),
  ])
}
