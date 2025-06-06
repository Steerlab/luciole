import luciole.{describe, it}
import luciole/cy

pub fn it_test() {
  it("does nothing", fn() { Nil })
}

pub fn describe_test() {
  describe("project", [
    it("describes nothing", fn() {
      cy.visit("https://google.com")
      cy.get("body")
      //|> should.equal(res)
    }),
  ])
}
