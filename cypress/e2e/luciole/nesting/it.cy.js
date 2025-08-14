import * as $cy from './../../../../api/build/dev/javascript/luciole/luciole/cypress.mjs'
it('visits the kitchen', function () {
  $cy.visit('https://example.cypress.io')
  $cy.contain('Kitchen')
})
