const position = {
  coords: {
    latitude: '40.6396951',
    longitude: '-73.96767679999999'
  }
}

// The timezone is set to America/Santarem in the npm cypress scripts,
// which is three hours before UTC
const sunResponse = {
  results: {
    sunrise: '12:13:12 PM',
    sunset: '10:15:16 PM'
  }
}

describe('Home page', () => {
  it('shows sunrise, sunset, and current times', () => {
    const { latitude, longitude } = position.coords

    cy.server()
    cy
      .route(
        `https://api.sunrise-sunset.org/json?lat=${latitude}&lng=${longitude}`,
        sunResponse
      )
      .as('getSunData')

    // set current time to 10:25 am
    const now = new Date(1970, 1, 1, 10, 25, 15).getTime()
    const clock = cy.clock(now)

    cy.visit('http://localhost:3000', {
      onBeforeLoad(pageWindow) {
        // stubbing getCurrentPosition to speed up test
        cy
          .stub(pageWindow.navigator.geolocation, 'getCurrentPosition')
          .callsArgWith(0, position)
      }
    })

    cy.wait('@getSunData')
    cy.contains('Sunrise: 9:13 am')
    cy.contains('Sunset: 7:15 pm')
    cy.contains('10:25 am')
  })
})
