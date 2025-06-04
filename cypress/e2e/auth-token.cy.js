describe('Auth0', function () {
  beforeEach(function () {
    cy.login(
      Cypress.env('auth0_username'),
      Cypress.env('auth0_password'),
      'token'
    )
  })

  it('shows onboarding', function () {
    cy.visit('/')
    cy.get('[data-cy="catchphrase"]').should('be.visible')
    cy.contains('Overview').should('be.visible')
  })
})
