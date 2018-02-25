describe('Home page', () => {
  it('has correct title', () => {
    cy.visit(Cypress.env('HOST') || 'http://localhost:3000')
    cy.title().should('include', 'Sun Clock')
  })
})
