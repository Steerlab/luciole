describe('project', [
  it('goes to Cypress example page', function() {
    cy.visit(
      'https://example.cypress.io'
    )
    cy.get(
      'body'
    )
      .should(
        'contain', 
        'Kitchen'
      )
    cy.get(
      'body'
    )
      .should(
        'contain', 
        'Kitchen'
      )
    cy.get(
      'body'
    )
      .should(
        'be.visible', 
      )
  })
])
