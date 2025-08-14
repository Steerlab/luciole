import { toList } from './../../../api/build/dev/javascript/luciole/gleam.mjs'
import * as $chain from './../../../api/build/dev/javascript/luciole/luciole/chain.mjs'
import * as $cy from './../../../api/build/dev/javascript/luciole/luciole/cypress.mjs'
import * as $should from './../../../api/build/dev/javascript/luciole/luciole/should.mjs'
describe("let's test should", function () {
  it('compares values', function () {
    let _pipe = $cy.wrap(3)
    $should.be_greater_than(_pipe, 2)
    let _pipe$1 = $cy.wrap(2.8)
    $should.be_less_than(_pipe$1, 3.1)
    let _pipe$2 = $cy.wrap('this')
    $should.equal(_pipe$2, 'this')
  })
  it('asserts the state of the DOM', function () {
    $cy.visit('https://example.cypress.io')
    let _pipe = $cy.get('h1')
    $should.be_visible(_pipe)
    let _pipe$1 = $cy.get('h1')
    let _pipe$2 = $should.have_prop(_pipe$1, 'tagName')
    $should.equal(_pipe$2, 'H1')
    let _pipe$3 = $cy.get('h1')
    $should.contain(_pipe$3, 'Kitchen')
    let _pipe$4 = $cy.get('a')
    let _pipe$5 = $chain.contain(_pipe$4, 'cypress.io')
    $should.have_class(_pipe$5, 'navbar-brand')
  })
})
