import * as $promise from './../../../api/build/dev/javascript/gleam_javascript/gleam/javascript/promise.mjs'
import * as $int from './../../../api/build/dev/javascript/gleam_stdlib/gleam/int.mjs'
import * as $result from './../../../api/build/dev/javascript/gleam_stdlib/gleam/result.mjs'
import { toList } from './../../../api/build/dev/javascript/luciole/gleam.mjs'
import * as $ch from './../../../api/build/dev/javascript/luciole/luciole/chain.mjs'
import * as $cy from './../../../api/build/dev/javascript/luciole/luciole/cypress.mjs'
import * as $should from './../../../api/build/dev/javascript/luciole/luciole/should.mjs'
import { set_html_attrs } from './../../../api/build/dev/javascript/luciole/cy/all.ffi.mjs'

describe("Testing functions I didn't test before", function () {
  beforeEach('Set the example document', function () {
    let _pipe = $cy.document()
    return $ch.then$(_pipe, (doc) => {
      let _pipe$1 = set_html_attrs(doc)
      return $cy.wrap(_pipe$1)
    })
  })
  it("checks that should.be_greater() doesn't change the given subject", function () {
    let _pipe = $cy.get('#number')
    let _pipe$1 = $ch.invoke(_pipe, 'val')
    let _pipe$2 = $ch.map(_pipe$1, (val) => {
      let _pipe$2 = $int.parse(val)
      return $result.unwrap(_pipe$2, 0)
    })
    $ch.then$(_pipe$2, (before) => {
      let _pipe$3 = $cy.wrap(before)
      let _pipe$4 = $should.be_greater_than(_pipe$3, 10)
      return $ch.then$(_pipe$4, (after) => {
        let _pipe$5 = $cy.wrap(before)
        return $should.equal(_pipe$5, after)
      })
    })
  })
  it('executes a command', function () {
    $cy.exec('ls -al')
  })
  it('wraps and resolve a Promise', function () {
    $cy.wrap_resolve($promise.wait(2000))
  })
  it('tests functions of luciole/chain', function () {
    let _pipe = $cy.get('#file_input')
    $ch.select_file(_pipe, 'README.md')
    let _pipe$1 = $cy.get('#incr_btn0')
    $ch.click(_pipe$1)
    let _pipe$2 = $cy.get('ul>li')
    $ch.each(_pipe$2, (el) => {
      let _pipe$3 = el
      let _pipe$4 = $ch.find(_pipe$3, 'button')
      return $ch.click(_pipe$4)
    })
    let _pipe$3 = $cy.get('button')
    $should.have_length(_pipe$3, 4)
    let _pipe$4 = $cy.get('ul')
    $ch.within(_pipe$4, () => {
      let _pipe$5 = $cy.get('button')
      return $should.have_length(_pipe$5, 3)
    })
    let _pipe$5 = $cy.get('#text_input')
    $ch.clear(_pipe$5)
    let _pipe$6 = $cy.get('#text_input')
    $ch.write(_pipe$6, 'POTATO')
    let _pipe$7 = $cy.get('#text_input')
    let _pipe$8 = $ch.invoke(_pipe$7, 'val')
    $should.equal(_pipe$8, 'POTATO')
  })
  it('tests functions of luciole/should', function () {
    let _pipe = $cy.get('#test')
    $ch.then$(_pipe, (before) => {
      let _pipe$1 = $cy.wrap(before)
      let _pipe$2 = $should.have_attr(_pipe$1, 'data-cy')
      return $ch.then$(_pipe$2, (after) => {
        let _pipe$3 = $cy.wrap(after)
        return $should.equal(_pipe$3, 'hello')
      })
    })
    let _pipe$1 = $cy.get('#number')
    $ch.then$(_pipe$1, (before) => {
      let _pipe$2 = $cy.wrap(before)
      let _pipe$3 = $should.have_value(_pipe$2, '15')
      return $ch.then$(_pipe$3, (after) => {
        let _pipe$4 = $cy.wrap(after)
        return $should.equal(_pipe$4, before)
      })
    })
  })
})
