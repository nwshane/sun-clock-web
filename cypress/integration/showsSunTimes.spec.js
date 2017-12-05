const position = {
  coords: {
    latitude: '40.6396951',
    longitude: '-73.96767679999999'
  }
}

const sunResponse = {
  results: {
    sunrise: '9:13:12 AM',
    sunset: '7:15:16 PM'
  }
}

describe('Home page', () => {
  it('shows sunrise and sunset times', () => {
    const { latitude, longitude } = position.coords

    cy.server()
    cy
      .route(
        `https://api.sunrise-sunset.org/json?lat=${latitude}&lng=${longitude}`,
        sunResponse
      )
      .as('getSunData')

    cy.visit('http://localhost:3000', {
      onBeforeLoad(pageWindow) {
        // stubbing getCurrentPosition to speed it up
        cy
          .stub(pageWindow.navigator.geolocation, 'getCurrentPosition')
          .callsArgWith(0, position)
      }
    })

    cy.wait('@getSunData')
    cy.contains('Sunrise: 9:13 am')
    cy.contains('Sunset: 7:15 pm')
  })
})
