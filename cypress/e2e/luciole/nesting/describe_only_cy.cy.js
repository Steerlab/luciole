import { toList } from './../../../../gleam/build/build/dev/javascript/luciole/gleam.mjs'
import * as $cy from './../../../../gleam/build/build/dev/javascript/luciole/luciole/cypress.mjs'
describe('outer describe', function () {
  describe.only('inner describe 1 (only)', function () {
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
