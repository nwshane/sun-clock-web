// IMPORTANT: This test will fail unless you start cypress in the npm scripts,
// because it needs the timezone to be set by an env variable!

describe('Date', () => {
  it('can be changed by user with date picker', () => {
    const now = new Date(2018, 3, 24, 10, 25, 15).getTime()
    const clock = cy.clock(now)

    cy.visitWithStubbedLocation('')

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
