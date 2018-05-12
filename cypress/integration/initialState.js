describe('Initial State', () => {
  it('shows current date by default', () => {
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
  })

  it('shows random location by default', () => {
    cy.visit('', {
      onBeforeLoad(pageWindow) {
        // make app choose Bucharest as its random location
        cy.stub(pageWindow.Math, 'random').returns(0.7681096010954755)
      }
    })
    cy.contains('Bucharest (Romania)')
  })

  context('when location but not date is specified in URL', () => {
    it('shows the local time and date for that location', () => {
      const now = new Date(2018, 4, 10, 20, 25, 15).getTime()
      const clock = cy.clock(now)

      cy.visitWithStubbedLocation('?location=Dubai_United_Arab_Emirates')

      cy.contains('Dubai (United Arab Emirates)') // can't fit the whole name

      cy
        .get('[data-test="clock-date-select-container"] input')
        .should('have.value', '2018-05-11')

      cy.contains('3:25 am')
    })
  })

  context('when date but not location is specified in URL', () => {
    it('shows URL date and current location time', () => {
      const now = new Date(2018, 3, 24, 23, 25, 15).getTime()
      const clock = cy.clock(now)
      cy.visitWithStubbedLocation('?date=2018-05-07', {
        onBeforeLoad(pageWindow) {
          // make app choose Bucharest as its random location
          cy.stub(pageWindow.Math, 'random').returns(0.7681096010954755)
        }
      })

      cy
        .get('[data-test="clock-date-select-container"] input')
        .should('have.value', '2018-05-07')

      cy.contains('11:25 pm')
    })
  })

  // todo: fix this test! it doesn't work right now because the
  // clockDate is set using the URL date, and then getLocalClockDate
  // can sometimes change the day to the next day
  context('when date and location are specified in URL', () => {
    it('shows URL date and current location time', () => {
      const now = new Date(2018, 3, 24, 23, 25, 15).getTime()
      const clock = cy.clock(now)
      cy.visitWithStubbedLocation(
        '?date=2018-05-07&location=Dubai_United_Arab_Emirates'
      )

      cy
        .get('[data-test="clock-date-select-container"] input')
        .should('have.value', '2018-05-07')

      cy.contains('11:25 pm')
    })
  })
})
