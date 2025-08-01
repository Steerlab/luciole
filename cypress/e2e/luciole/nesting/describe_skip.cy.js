import { toList } from './../../../../api/build/dev/javascript/luciole/gleam.mjs'
import * as $cy from './../../../../api/build/dev/javascript/luciole/luciole/cypress.mjs'

describe('outer describe', function () {
  describe.skip('inner describe 1 (skip)', function () {
    it('check the kitchen 1', function () {
      $cy.visit('https://example.cypress.io')
      $cy.contains('Kitchen')
    })
  })
  describe('inner describe 2', function () {
    it('check the kitchen 2', function () {
      $cy.visit('https://example.cypress.io')
      $cy.contains('Kitchen')
    })
  })
})
