import * as $cy from '../../../build/dev/javascript/luciole/luciole/cypress.mjs'
export function it_only_cy() {
  return it('visits the kitchen', function () {
    $cy.visit('https://example.cypress.io')
    $cy.contains('Kitchen')
  })
}
