describe('User on home page', () => {
  it('can view and then close about page', () => {
    cy.visitWithStubbedLocation('')

    cy
      .get('[data-test="main"]')
      .contains('Sun Clock')
      .should('not.exist')
    cy
      .get('[data-test="main"]')
      .contains('Nathan Shane')
      .should('not.exist')

    cy.contains("What's This?").click()

    cy.get('[data-test="main"]').contains('Sun Clock')
    cy.get('[data-test="main"]').contains('Nathan Shane')

    cy.contains('X').click()

    cy
      .get('[data-test="main"]')
      .contains('Sun Clock')
      .should('not.exist')
    cy
      .get('[data-test="main"]')
      .contains('Nathan Shane')
      .should('not.exist')

    cy.contains("What's This?").click()

    cy.get('[data-test="main"]').contains('Sun Clock')
    cy.get('[data-test="main"]').contains('Nathan Shane')

    // Clicking outside of about overlay closes it
    cy.get('[data-test="main"]').click('topLeft')

    cy
      .get('[data-test="main"]')
      .contains('Sun Clock')
      .should('not.exist')
    cy
      .get('[data-test="main"]')
      .contains('Nathan Shane')
      .should('not.exist')
  })
})
