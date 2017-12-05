describe('Home page', () => {
  it('has correct title', () => {
    cy.visit('http://localhost:3000')
    cy.title().should('include', 'Sun Clock')
  })
})
