import { toList } from './../../../../api/build/dev/javascript/luciole/gleam.mjs'
import * as $cy from './../../../../api/build/dev/javascript/luciole/luciole/cypress.mjs'

describe('outer describe', function () {
  it.only('visits the kitchen 1 (only)', function () {
    $cy.visit('https://example.cypress.io')
    $cy.contain('Kitchen')
  })
  it('visits the kitchen 2', function () {
    $cy.visit('https://example.cypress.io')
    $cy.contain('Kitchen')
  })
})
