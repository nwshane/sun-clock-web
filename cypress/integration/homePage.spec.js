describe('Home page', () => {
  it('has correct title', () => {
    cy.visit('')
    cy.title().should('include', 'Sun Clock')
  })
})
