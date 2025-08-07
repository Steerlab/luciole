import { toList } from './../../../../api/build/dev/javascript/luciole/gleam.mjs'
import * as $cy from './../../../../api/build/dev/javascript/luciole/luciole/cypress.mjs'

describe('outer describe', function () {
  beforeEach('visit the Kitchen', function () {
    return $cy.visit('https://example.cypress.io')
  })
  describe.only('a. inner describe.only', function () {
    it.only('1. it.only', function () {
      $cy.contain('Kitchen')
    })
    it.only('2. it.only', function () {
      $cy.contain('Kitchen')
    })
    it('3. it', function () {
      $cy.contain('Kitchen')
    })
  })
  describe.only('b. inner describe.only', function () {
    it.only('1. it.only', function () {
      $cy.contain('Kitchen')
    })
    it.only('2. it.only', function () {
      $cy.contain('Kitchen')
    })
    it('3. it', function () {
      $cy.contain('Kitchen')
    })
  })
  describe('c. inner describe with it.only', function () {
    it.only('1. it.only', function () {
      $cy.contain('Kitchen')
    })
    it.only('2. it.only', function () {
      $cy.contain('Kitchen')
    })
    it('3. it', function () {
      $cy.contain('Kitchen')
    })
  })
  describe('c. inner describe without it.only', function () {
    it('3. it', function () {
      $cy.contain('Kitchen')
    })
  })
})
