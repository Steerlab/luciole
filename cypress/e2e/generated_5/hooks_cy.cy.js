import { toList } from './../../build/dev/javascript/luciole/gleam.mjs'
import * as $chain from './../../build/dev/javascript/luciole/luciole/chain.mjs'
import * as $cy from './../../build/dev/javascript/luciole/luciole/cypress.mjs'
import * as $should from './../../build/dev/javascript/luciole/luciole/should.mjs'
describe('project', function () {
  before('go to Traversal page', function () {
    $cy.visit('https://example.cypress.io/commands/traversal')
    let _pipe = $cy.get('h1')
    return $should.contain(_pipe, 'Traversal')
  })
  beforeEach('go to Cypress example page', function () {
    return $cy.visit('https://example.cypress.io')
  })
  afterEach('is the same the same page', function () {
    let _pipe = $cy.wrap(2 + 2)
    return $should.equal(_pipe, 4)
  })
  after('has the correct title', function () {
    let _pipe = $cy.get('h1')
    return $should.contain(_pipe, 'Kitchen Sink')
  })
  it('has the title Kitchen', function () {
    let _pipe = $cy.get('h1')
    $should.contain(_pipe, 'Kitchen')
  })
  it('check that it contains Kitchen', function () {
    $should.contain($cy.get('body'), 'Kitchen')
    let _pipe = $cy.get('body')
    $should.contain(_pipe, 'Kitchen')
    let _pipe$1 = $cy.get('body')
    $chain.contains(_pipe$1, 'Kitchen')
    $cy.contains('Kitchen')
    let _pipe$2 = $cy.get('body')
    $should.be_visible(_pipe$2)
  })
})
