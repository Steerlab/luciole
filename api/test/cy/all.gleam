import gleam/int
import gleam/javascript/promise
import gleam/result
import luciole.{before_each, describe, it}
import luciole/chain as ch
import luciole/cypress as cy
import luciole/should

pub fn all_cy() {
  describe("Testing functions I didn't test before", [
    before_each("Set the example document", fn() {
      cy.document()
      |> ch.then(fn(doc) { set_html_attrs(doc) |> cy.wrap })
    }),
    it("checks that should.be_greater() doesn't change the given subject", fn() {
      cy.get("#number")
      // Get the value (a string)
      |> ch.invoke("val")
      // Type cast
      |> ch.map(fn(val) { int.parse(val) |> result.unwrap(0) })
      |> ch.then(fn(before) {
        cy.wrap(before)
        // Apply the assertion
        |> should.be_greater_than(10)
        |> ch.then(fn(after) {
          // Check equality between subjects before and after the assertion
          cy.wrap(before) |> should.equal(after)
        })
      })
    }),
    it("executes a command", fn() { cy.exec("ls -al") }),
    it("wraps and resolve a Promise", fn() {
      cy.wrap_resolve(promise.wait(2000))
    }),
    it("tests functions of luciole/chain", fn() {
      cy.get("#file_input") |> ch.select_file("README.md")
      cy.get("#incr_btn0") |> ch.click()
      cy.get("ul>li")
      |> ch.each(fn(el) { el |> ch.find("button") |> ch.click() })
      cy.get("button") |> should.have_length(4)
      cy.get("ul")
      |> ch.within(fn() { cy.get("button") |> should.have_length(3) })
      cy.get("#text_input") |> ch.clear()
      cy.get("#text_input") |> ch.write("POTATO")
      cy.get("#text_input") |> ch.invoke("val") |> should.equal("POTATO")
    }),
    it("tests functions of luciole/should", fn() {
      cy.get("#test")
      |> ch.then(fn(before) {
        cy.wrap(before)
        // have_attr changes the subject to the value of the attribute
        |> should.have_attr("data-cy")
        |> ch.then(fn(after) { cy.wrap(after) |> should.equal("hello") })
      })

      cy.get("#number")
      |> ch.then(fn(before) {
        cy.wrap(before)
        // have_value doesn't change the subject
        |> should.have_value("15")
        |> ch.then(fn(after) { cy.wrap(after) |> should.equal(before) })
      })
    }),
  ])
}

@external(javascript, "all.ffi.mjs", "set_html_attrs")
fn set_html_attrs(doc: any) -> Nil
