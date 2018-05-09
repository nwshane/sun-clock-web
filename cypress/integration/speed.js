describe('Speed', () => {
  it('is in real time by default', () => {
    const now = new Date(2018, 0, 5, 10, 25, 59, 0).getTime()
    const clock = cy.clock(now)

    cy.visitWithStubbedLocation('/?location=Santar%25C3%25A9m_Brazil')
    cy.contains('10:25 am')
    // this isn't just 1000 because it needs to be a multiple of `tickAmountMilliseconds`,
    // or else the last tick won't get triggered
    cy.tick(1005)
    cy.contains('10:26 am')
  })

  it('is multiplied by speed query param number', () => {
    const now = new Date(2018, 0, 5, 10, 25, 0, 0).getTime()
    const clock = cy.clock(now)

    cy.visitWithStubbedLocation(
      '/?location=Santar%25C3%25A9m_Brazil&speed=3600'
    )
    cy.contains('10:25 am')
    cy.tick(1005)
    cy.contains('11:25 am')
  })

  it('updates sun times correctly', () => {
    const now = new Date(2018, 0, 5, 18, 59, 0, 0).getTime()
    const clock = cy.clock(now)

    // 1 second real time = 4 days clock time
    const speed = 60 * 60 * 24 * 4

    cy.visitWithStubbedLocation(`/?location=Tallinn_Estonia&speed=${speed}`)

    cy.contains('11:59 pm')
    cy.contains('9:16 am')
    cy.contains('3:39 pm')
    cy
      .get('[data-test="clock-date-select-container"] input')
      .should('have.value', '2018-01-05')

    // it's 11:59 pm, and now we move ahead a little less than 4 days
    cy.tick(990)

    cy.contains('11:01 pm')
    cy.contains('9:13 am')
    cy.contains('3:44 pm')
    cy
      .get('[data-test="clock-date-select-container"] input')
      .should('have.value', '2018-01-09')

    // and now we move ahead to the next day
    // this allows us to check that the clock is updating at midnight
    cy.tick(15)

    cy.contains('12:27 am')
    cy.contains('9:12 am')
    cy.contains('3:46 pm')
    cy
      .get('[data-test="clock-date-select-container"] input')
      .should('have.value', '2018-01-10')
  })
})
