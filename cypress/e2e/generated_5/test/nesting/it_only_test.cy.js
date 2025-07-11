import * as $luciole from '../../../../../build/dev/javascript/luciole/luciole.mjs'
import { it } from '../../../../../build/dev/javascript/luciole/luciole.mjs'
import * as $cy from '../../../../../build/dev/javascript/luciole/luciole/cypress.mjs'
export function it_only_test() {
  return it('visits the kitchen', function () {
    $cy.visit('https://example.cypress.io')
    $cy.contains('Kitchen')
  })
}
