describe('Sun times', () => {
  it('change when time passes midnight', () => {
    // Santarem is 5 hours behind Tallinn, so this is 11:59 pm in Tallinn

    // TODO: fix bug which causes different sun times to be output for hour 18 and hour 10
    // both of these times are the same in Estonia, so they should output the same suntimes
    const hour = 10
    // const hour = 18

    const now = new Date(2018, 2, 21, 10, 59, 59, 0).getTime()
    const clock = cy.clock(now)

    cy.visitWithStubbedLocation('/?location=Tallinn_Estonia')
    cy.contains('11:59 pm')
    cy.contains('6:18 am')
    cy.contains('6:39 pm')

    cy
      .get('[data-test="clock-date-select-container"] input')
      .should('have.value', '2018-03-21')

    // this isn't just 1000 because it needs to be a multiple of `tickAmountMilliseconds`,
    // or else the last tick won't get triggered
    cy.tick(1005)

    cy.contains('12:00 am')
    cy.contains('6:19 am')
    cy.contains('6:40 pm')
    cy
      .get('[data-test="clock-date-select-container"] input')
      .should('have.value', '2018-03-22')
  })
})
