import { toList } from './../../../../api/build/dev/javascript/luciole/gleam.mjs'
import * as $cy from './../../../../api/build/dev/javascript/luciole/luciole/cypress.mjs'
function kitchen() {
  $cy.visit('https://example.cypress.io')
  return $cy.contain('Kitchen')
}
function utilities() {
  $cy.visit('https://example.cypress.io/utilities')
  return $cy.contain('Utilities')
}
describe('outer describe', function () {
  it('goes to the Kitchen', function () {
    kitchen()
  })
  it('goes to Utilities', function () {
    utilities()
  })
})
