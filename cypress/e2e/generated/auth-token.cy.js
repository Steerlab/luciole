describe('Auth0', function () {
  beforeEach(function () {
    expect()
  })
  
  it('shows onboarding', function () {
    cy.visit('/')
    cy.get('[data-cy="catchphrase"]')
  })
})
