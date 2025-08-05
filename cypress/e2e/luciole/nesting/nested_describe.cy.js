import { toList } from './../../../../api/build/dev/javascript/luciole/gleam.mjs'
import * as $cy from './../../../../api/build/dev/javascript/luciole/luciole/cypress.mjs'

describe('outer describe', function () {
  describe('inner describe', function () {
    it('visits the kitchen', function () {
      $cy.visit('https://example.cypress.io')
      $cy.contain('Kitchen')
    })
  })
})
