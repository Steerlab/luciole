describe("project", [
  it("goes to Cypress example page", function () {
    cy.visit("https://example.cypress.io")
    cy.get('h1').contains('Kitchen')
    cy.get('h1').should('contain', 'Kitchen')
    cy.get('h1').should('be.visible')
  })
])
