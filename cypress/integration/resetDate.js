describe('Reset Date Button', () => {
  it('resets date to current date and speed to real time', () => {
    const now = new Date(2018, 3, 24, 10, 25, 15).getTime()
    cy.clock(now)

    cy.visitWithStubbedLocation(
      '?date=2018-07-09&location=Adelaide_Australia&speed=123432'
    )

    cy.tick(16)

    cy.contains('11:28 pm')

    cy
      .get('[data-test="clock-date-select-container"] input')
      .should('have.value', '2018-07-09')
    cy.contains('1 day/second')

    cy.get('[data-test="reset-date-button"]').click()

    // effects of the clicking the reset date button:
    cy.get('[data-test="reset-date-button"]').should('not.exist')
    cy
      .get('[data-test="clock-date-select-container"] input')
      .should('have.value', '2018-04-24')
    cy.contains('10:55 pm')
    cy.contains('Real Time')
    cy.location('search').should('eq', '?location=Adelaide_Australia')
  })
})
