// IMPORTANT: This test will fail unless you start cypress in the npm scripts,
// because it needs the timezone to be set by an env variable!

describe('User on home page', () => {
  it('can change date with clock date picker', () => {
    const now = new Date(2018, 3, 24, 10, 25, 15).getTime()
    const clock = cy.clock(now)

    cy.visit(Cypress.env('HOST') || 'http://localhost:3000', {
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

    cy.contains('Show My Location').click()

    cy.contains('6:36 am')
    cy.contains('6:39 pm')
    cy.contains('10:25 am')
    cy
      .get('[data-test="clock-date-select-container"] input')
      .should('have.value', '2018-04-24')

    cy.contains('Date:').click()
    cy
      .get('.react-datepicker-popper')
      .contains('13')
      .click()

    cy.contains('6:38 am')
    cy.contains('6:42 pm')
    cy.contains('10:25 am')
    cy
      .get('[data-test="clock-date-select-container"] input')
      .should('have.value', '2018-04-13')

    cy.location('search').should('eq', '?date=2018-04-13')
  })
})
