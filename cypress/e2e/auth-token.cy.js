describe('Auth0', function () {
  // beforeEach(function () {
  //   cy.login(
  //     Cypress.env('auth0_username'),
  //     Cypress.env('auth0_password'),
  //     'token'
  //   )
  // })

  it('shows onboarding', function () {
    cy.visit('https://example.cypress.io');

    expect(2 + 1).to.equal(3);
    // Number(2 + 1).should('equal', 3);

    cy.contains('Kitchen Sink').should('be.visible');
    // expect(cy.contains('Kitchen Sink')).to.be.visible();

    // cy.get('[data-cy="catchphrase"]').should('be.visible');
    // cy.contains('Overview').should('be.visible');
  })
})
