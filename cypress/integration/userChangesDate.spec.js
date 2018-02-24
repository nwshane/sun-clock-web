describe('User on home page', () => {
  it('can change date with clock date picker', () => {
    const now = new Date(1970, 0, 5, 10, 25, 15).getTime()
    const clock = cy.clock(now)

    cy.visit('http://localhost:3000', {
      onBeforeLoad(pageWindow) {
        // The timezone is hardcoded to America/Santarem in the npm scripts for
        // running cypress, and these coordinates are in Santarem.
        const position = {
          coords: {
            latitude: -2.44306,
            longitude: -54.70833
          }
        }

        // stubbing getCurrentPosition to speed up test
        cy
          .stub(pageWindow.navigator.geolocation, 'getCurrentPosition')
          .callsArgWith(0, position)
      }
    })

    cy.contains('6:37 am')
    cy.contains('6:53 pm')
    cy.contains('10:25 am')
    cy
      .get('[data-name-for-tests="clock-date-select-container"] input')
      .should('have.value', '1970-01-05')

    cy.contains('Clock Date').click()
    cy
      .get('.react-datepicker-popper')
      .contains('20')
      .click()

    cy.contains('6:43 am')
    cy.contains('6:58 pm')
    cy.contains('10:25 am')
    cy
      .get('[data-name-for-tests="clock-date-select-container"] input')
      .should('have.value', '1970-01-20')
  })
})
