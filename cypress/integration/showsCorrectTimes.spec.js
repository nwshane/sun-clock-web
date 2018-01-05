// The timezone is hardcoded to America/Santarem in the npm scripts for
// running cypress, and these coordinates are in Santarem.
const position = {
  coords: {
    latitude: -2.44306,
    longitude: -54.70833
  }
}

describe('Home page', () => {
  it('shows sunrise, sunset, and current times correctly', () => {
    const { latitude, longitude } = position.coords

    const now = new Date(1970, 0, 5, 10, 25, 15).getTime()
    const clock = cy.clock(now)

    cy.visit('http://localhost:3000', {
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
  })
})
