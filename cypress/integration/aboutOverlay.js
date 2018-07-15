describe('About Overlay', () => {
  it('can be opened and closed by user', () => {
    cy.visitWithStubbedLocation('')

    cy
      .get('[data-test="main"]')
      .contains('Sun Clock')
      .should('not.exist')
    cy
      .get('[data-test="main"]')
      .contains('Nathan Shane')
      .should('not.exist')

    cy.contains("What's This?").click()

    cy.get('[data-test="main"]').contains('Sun Clock')
    cy.get('[data-test="main"]').contains('Nathan Shane')

    cy.contains('X').click()

    cy
      .get('[data-test="main"]')
      .contains('Sun Clock')
      .should('not.exist')
    cy
      .get('[data-test="main"]')
      .contains('Nathan Shane')
      .should('not.exist')

    cy.contains("What's This?").click()

    cy.get('[data-test="main"]').contains('Sun Clock')
    cy.get('[data-test="main"]').contains('Nathan Shane')

    // Clicking outside of about overlay closes it
    cy.get('[data-test="main"]').click('topLeft')

    cy
      .get('[data-test="main"]')
      .contains('Sun Clock')
      .should('not.exist')
    cy
      .get('[data-test="main"]')
      .contains('Nathan Shane')
      .should('not.exist')
  })

  it('shows get outside message for daytime', () => {
    const now = new Date(2018, 3, 24, 10, 25, 15).getTime()
    const clock = cy.clock(now)

    cy.visitWithStubbedLocation('')
    cy.contains('Show My Location').click()

    cy.contains("What's This?").click()

    cy.contains('Now go outside and get some sun already ;)')
  })

  it('shows go to sleep message for nighttime', () => {
    const now = new Date(2018, 3, 24, 2, 11, 15).getTime()
    const clock = cy.clock(now)

    cy.visitWithStubbedLocation('')
    cy.contains('Show My Location').click()

    cy.contains("What's This?").click()

    cy.contains('Now go get some sleep already ;)')
  })

  it('does not show specialized message for other locations', () => {
    const now = new Date(2018, 3, 24, 10, 25, 15).getTime()
    const clock = cy.clock(now)

    cy.visitWithStubbedLocation('?location=Adelaide_Australia')

    cy.contains("What's This?").click()

    cy
      .contains('Now go outside and get some sun already ;)')
      .should('not.exist')

    cy.contains('Now go get some sleep already ;)').should('not.exist')
  })
})
