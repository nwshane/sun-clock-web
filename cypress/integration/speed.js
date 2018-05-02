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
})
