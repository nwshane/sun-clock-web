// IMPORTANT: This test will fail unless you start cypress in the npm scripts,
// because it needs the timezone to be set by an env variable!

describe('Date Select', () => {
  it('shows same time and new date after switching date', () => {
    const now = new Date(2018, 6, 24, 10, 25, 15).getTime()
    cy.clock(now)

    cy.visitWithStubbedLocation('')
    cy.contains('Show My Location').click()

    cy.contains('6:46 am')
    cy.contains('6:46 pm')
    cy.contains('10:25 am')

    cy.get('#clock-date-picker').click()
    cy.tick(1000)

    cy.get('.DayPickerNavigation_leftButton__horizontalDefault').click()
    cy.contains('June')

    cy.get('.DayPickerNavigation_leftButton__horizontalDefault').click()
    cy.contains('May')

    cy.get('.DayPickerNavigation_leftButton__horizontalDefault').click()
    cy.contains('April')

    cy
      .get('.SingleDatePicker_picker')
      .contains('13')
      .click({ force: true })

    cy.contains('6:38 am')
    cy.contains('6:42 pm')
    cy.contains('12h 4m')
    cy.contains('10:25 am')
    cy
      .get('[data-test="clock-date-select-container"] input')
      .should('have.value', '2018-04-13')

    cy.location('search').should('eq', '?date=2018-04-13')

    // navigate back to previous date with browser back button
    cy.go('back')
    cy.location('search').should('eq', '')
    cy.contains('6:46 am')
    cy.contains('6:46 pm')
    cy.contains('10:25 am')

    // and go forward with browser forward button
    cy.go('forward')
    cy.location('search').should('eq', '?date=2018-04-13')
    cy.contains('6:38 am')
    cy.contains('6:42 pm')
    cy.contains('10:25 am')
  })
})
