describe('Show My Location', () => {
  it('shows your current location', () => {
    const now = new Date(2018, 3, 24, 10, 25, 15).getTime()
    const clock = cy.clock(now)

    cy.visitWithStubbedLocation(
      '?date=2018-07-09&location=Adelaide_Australia&speed=123'
    )
    cy.contains('Show My Location').click()

    cy.contains('Current Location')

    cy.contains('6:45 am')
    cy.contains('6:44 pm')
    cy.contains('10:25 am')

    cy.location('search').should('eq', '?date=2018-07-09&speed=123')
  })

  it('is hidden by loading state until current location loads', () => {
    cy.visit('?date=2018-07-09&location=Adelaide_Australia&speed=123')
    cy.contains('Loading Current Location...')
  })
})
