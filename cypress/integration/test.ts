describe('cypress-wait-for-network-idle', () => {
  it('waits for the network to idle before continuing (short idle)', () => {
    cy.visit('http://localhost:8080')
    cy.waitForNetworkIdle({ timeout: 2000, minIdleTime: 200 })
    cy.get('h1', { timeout: 0 }).should('contain', 'First')
  })

  it('waits for the network to idle before continuing (long idle)', () => {
    cy.visit('http://localhost:8080')
    cy.waitForNetworkIdle({ timeout: 5000, minIdleTime: 500 })
    cy.get('h1', { timeout: 0 }).should('contain', 'Second')
  })
})
