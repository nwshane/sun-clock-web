describe('User on home page', () => {
  it('can view and then close about page', () => {
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

    cy
      .get('div')
      .contains('Sun Clock')
      .should('not.exist')
    cy
      .get('div')
      .contains('Nathan Shane')
      .should('not.exist')

    cy.contains('?').click()

    cy.get('div').contains('Sun Clock')
    cy.get('div').contains('Nathan Shane')

    cy.contains('X').click()

    cy
      .get('div')
      .contains('Sun Clock')
      .should('not.exist')
    cy
      .get('div')
      .contains('Nathan Shane')
      .should('not.exist')
  })
})
