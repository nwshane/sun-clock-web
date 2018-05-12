describe('Location Select', () => {
  context('when date is not specified in URL', () => {
    it('shows local date and time for new location', () => {
      const now = new Date(2018, 0, 5, 22, 25, 15).getTime()
      const clock = cy.clock(now)

      cy.visitWithStubbedLocation('/?location=Windhoek_Namibia')

      cy.contains('6:14 am')
      cy.contains('7:42 pm')
      cy.contains('3:25 am')

      cy
        .get('[data-test="clock-date-select-container"] input')
        .should('have.value', '2018-01-06')

      cy
        .get('[data-test="location-select-container"]')
        .find('input#location-select')
        .click({ force: true })

      const locationCount = 348

      cy
        .get('[data-test="location-select-container"]')
        .find('.Select-option')
        .should('have.length', locationCount)

      cy
        .get('[data-test="location-select-container"]')
        .find('input#location-select')
        .type('Herat', { force: true })

      cy
        .get('[data-test="location-select-container"]')
        .find('.Select-option')
        .should('have.length', 1)

      cy.contains('.Select-option', 'Herat (Afghanistan)').click()

      cy
        .get('[data-test="clock-date-select-container"] input')
        .should('have.value', '2018-01-06')

      cy.contains('7:29 am')
      cy.contains('5:26 pm')
      cy.contains('5:55 am')
      cy.get('[data-test="location-select-container"]').contains('Lat: 34.33')
      cy.get('[data-test="location-select-container"]').contains('Lon: 62.20')
      cy.location('search').should('eq', '?location=Herat_Afghanistan')

      cy.contains('Show My Location').click()

      cy.location('search').should('eq', '')
      cy.contains('6:37 am')
      cy.contains('6:53 pm')
      cy.contains('10:25 pm')
      cy
        .get('[data-test="clock-date-select-container"] input')
        .should('have.value', '2018-01-05')
    })
  })

  context('when date is specified in URL', () => {
    it('shows same date and time after switching location', () => {
      const now = new Date(2018, 3, 24, 10, 25, 15).getTime()
      const clock = cy.clock(now)

      cy.visitWithStubbedLocation('?date=2018-07-09&location=Windhoek_Namibia')

      cy.contains('7:33 am')
      cy.contains('6:22 pm')
      cy.contains('10:25 am')
      cy
        .get('[data-test="clock-date-select-container"] input')
        .should('have.value', '2018-07-09')

      cy.contains('Show My Location').click()

      cy.contains('6:45 am')
      cy.contains('6:44 pm')
      cy.contains('10:25 am')
      cy
        .get('[data-test="clock-date-select-container"] input')
        .should('have.value', '2018-07-09')
    })
  })
})
