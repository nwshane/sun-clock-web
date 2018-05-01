// IMPORTANT: This test will fail unless you start cypress in the npm scripts,
// because it needs the timezone to be set by an env variable!
describe('Location', () => {
  it('can be changed with location select', () => {
    const now = new Date(2018, 0, 5, 10, 25, 15).getTime()
    const clock = cy.clock(now)

    cy.visitWithStubbedLocation('/?location=Windhoek_Namibia')

    cy.contains('6:14 am')
    cy.contains('7:41 pm')
    cy.contains('3:25 pm')

    cy
      .get('[data-test="location-select-container"]')
      .find('input#location-select')
      .click({ force: true })

    const locationCount = 348

    cy
      .get('[data-test="location-select-container"]')
      .find('.Select-option')
      .should('have.length', locationCount)

    cy
      .get('[data-test="location-select-container"]')
      .find('input#location-select')
      .type('Herat', { force: true })

    cy
      .get('[data-test="location-select-container"]')
      .find('.Select-option')
      .should('have.length', 1)

    cy.contains('.Select-option', 'Herat (Afghanistan)').click()

    cy.contains('7:29 am')
    cy.contains('5:25 pm')
    cy.contains('5:55 pm')
    cy.get('[data-test="location-select-container"]').contains('Lat: 34.33')
    cy.get('[data-test="location-select-container"]').contains('Lon: 62.20')

    cy.location('search').should('eq', '?location=Herat_Afghanistan')
    cy.contains('Show My Location').click()
    cy.location('search').should('eq', '')
  })
})
