describe('Page Title', () => {
  it('is correct', () => {
    cy.visit('')
    cy.title().should('include', 'Sun Clock')
  })
})
