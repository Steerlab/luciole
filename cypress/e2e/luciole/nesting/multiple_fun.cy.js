import { toList } from './../../../../api/build/dev/javascript/luciole/gleam.mjs'
import * as $cy from './../../../../api/build/dev/javascript/luciole/luciole/cypress.mjs'

function visits_the_kitchen() {
  return it('visits the kitchen', function () {
    $cy.visit('https://example.cypress.io')
    $cy.contain('Kitchen')
  })
}

function dummy() {
  return describe(
    'inner describe',
    toList([
      it('visits utilites', function () {
        $cy.visit('https://example.cypress.io/utilities')
        $cy.contain('Utilities')
      }),
    ]),
  )
}

describe('outer describe', function () {
  visits_the_kitchen()
  dummy()
})
