describe('Show My Location & Time Button', () => {
  it('shows your current location and time', () => {
    const now = new Date(2018, 3, 24, 10, 25, 15).getTime()
    const clock = cy.clock(now)

    cy.visitWithStubbedLocation(
      '?date=2018-07-09&location=Adelaide_Australia&speed=123'
    )
    cy.contains('Show My Location & Time').click()

    cy.contains('Current Location')

    cy.contains('6:36 am')
    cy.contains('6:39 pm')
    cy.contains('10:25 am')

    cy
      .get('[data-test="clock-date-select-container"] input')
      .should('have.value', '2018-04-24')

    cy.location('search').should('eq', '?speed=123')
  })

  it('is hidden by loading state until current location loads')
})
