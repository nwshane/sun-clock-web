// IMPORTANT: This test will fail unless you start cypress in the npm scripts,
// because it needs the timezone to be set by an env variable!
describe('Speed', () => {
  it('is in real time by default', () => {
    const now = new Date(2018, 0, 5, 10, 25, 59, 0).getTime()
    const clock = cy.clock(now)

    cy.visitWithStubbedLocation('/?location=Santar%25C3%25A9m_Brazil')
    cy.contains('10:25 am')
    cy.tick(1020)
    cy.contains('10:26 am')
  })
})
