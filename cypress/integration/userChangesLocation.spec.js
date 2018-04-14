// The timezone is hardcoded to America/Santarem in the npm scripts for
// running cypress, and these coordinates are in Santarem.
const position = {
  coords: {
    latitude: -2.44306,
    longitude: -54.70833
  }
}

describe('User on home page', () => {
  it('can change location with location select', () => {
    const { latitude, longitude } = position.coords

    const now = new Date(1970, 0, 5, 10, 25, 15).getTime()
    const clock = cy.clock(now)

    cy.visit(Cypress.env('HOST') || 'http://localhost:3000', {
      onBeforeLoad(pageWindow) {
        // stubbing getCurrentPosition to speed up test
        cy
          .stub(pageWindow.navigator.geolocation, 'getCurrentPosition')
          .callsArgWith(0, position)
      }
    })

    cy.contains('6:37 am')
    cy.contains('6:53 pm')
    cy.contains('10:25 am')
    cy.contains('Current Location')
    cy.get('[data-test="location-select-container"]').contains('Lat: -2.44')
    cy.get('[data-test="location-select-container"]').contains('Lon: -54.71')

    cy.get('[data-test="location-select-container"]').click()
    cy.contains('St. Petersburg').click()

    cy.contains('3:52 pm')
    cy.contains('6:11 am')
    cy.contains('10:25 am')
    cy.get('[data-test="location-select-container"]').contains('Lat: -33.87')
    cy.get('[data-test="location-select-container"]').contains('Lon: 151.21')
  })
})
