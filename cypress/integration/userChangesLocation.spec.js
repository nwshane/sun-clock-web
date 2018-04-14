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

    cy.get('[data-test="location-select-container"]').click()
    cy.get('.Select-menu').scrollTo('top')
    cy.contains('.Select-option', 'Herat (Afghanistan)').click()

    // url contains Saint_Petersburg_Russia

    cy.contains('7:29 am')
    cy.contains('5:26 pm')
    cy.contains('5:55 pm')
    cy.get('[data-test="location-select-container"]').contains('Lat: 34.33')
    cy.get('[data-test="location-select-container"]').contains('Lon: 62.20')
  })
})
