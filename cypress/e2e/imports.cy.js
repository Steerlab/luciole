import * as $cy from "../build/dev/javascript/luciole/luciole/cypress.mjs";

describe('imports', () => {
  it('uses an external function', () => {
    cy.visit('https://example.cypress.io')
    $cy.visit('https://example.cypress.io')
  })
})
