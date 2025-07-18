import luciole.{describe, it}
import luciole/cypress as cy

pub fn describe_only_cy() {
  describe("does nothing", [it("DOES NOTHING", fn() { cy.do_nothing() })])
}
