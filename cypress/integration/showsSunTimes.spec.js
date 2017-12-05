describe('Home page', () => {
  it('shows sunrise and sunset times', () => {
    cy.server()
    cy
      .route('https://api.sunrise-sunset.org/json**', {
        results: {
          sunrise: '9:13:12 AM',
          sunset: '7:15:16 PM'
        }
      })
      .as('getSunData')

    cy.visit('http://localhost:3000')

    cy.wait('@getSunData')
    cy.contains('Sunrise: 9:13 am')
    cy.contains('Sunset: 7:15 pm')
  })
})
