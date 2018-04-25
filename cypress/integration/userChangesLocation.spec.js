describe('User on home page', () => {
  it('can change location with location select', () => {
    const now = new Date(1970, 0, 5, 10, 25, 15).getTime()
    const clock = cy.clock(now)

    cy.visit(Cypress.env('HOST'))

    cy.get('[data-test="location-select-container"]').click()
    cy.get('.Select-menu').scrollTo('top')
    cy.contains('.Select-option', 'Herat (Afghanistan)').click()

    cy.contains('7:29 am')
    cy.contains('5:26 pm')
    cy.contains('7:55 pm')
    cy.get('[data-test="location-select-container"]').contains('Lat: 34.33')
    cy.get('[data-test="location-select-container"]').contains('Lon: 62.20')

    cy.location('search').should('eq', '?location=Herat_Afghanistan')
  })
})
