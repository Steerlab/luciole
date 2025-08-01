import { toList } from './../../../../api/build/build/dev/javascript/luciole/gleam.mjs'
import * as $cy from './../../../../api/build/build/dev/javascript/luciole/luciole/cypress.mjs'

function visits_the_kitchen() {
  return it('visits the kitchen', function () {
    $cy.visit('https://example.cypress.io')
    $cy.contains('Kitchen')
  })
}

function dummy() {
  return describe(
    'inner describe',
    toList([
      it('visits utilites', function () {
        $cy.visit('https://example.cypress.io/utilities')
        $cy.contains('Utilities')
      }),
    ]),
  )
}

describe('outer describe', function () {
  visits_the_kitchen()
  dummy()
})
