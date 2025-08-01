import { toList } from './../../../../api/build/build/dev/javascript/luciole/gleam.mjs'
import * as $cy from './../../../../api/build/build/dev/javascript/luciole/luciole/cypress.mjs'

describe('outer describe', function () {
  it.skip('visits the kitchen 1 (skip)', function () {
    $cy.visit('https://example.cypress.io')
    $cy.contains('Kitchen')
  })
  it('visits the kitchen 2', function () {
    $cy.visit('https://example.cypress.io')
    $cy.contains('Kitchen')
  })
})
