describe('Home page title', () => {
  it('.should() - assert that <title> is correct', () => {
    cy.visit('http://localhost:3000')
    cy.title().should('include', 'Sun Clock')
  })
})
