describe('cypress-wait-for-network-idle', () => {
  it('waits for the network to idle before continuing', () => {
    cy.visit('http://localhost:8080')
    cy.waitForNetworkIdle()
    cy.get('h1', { timeout: 0 }).should('contain', 'Done')
  })
})
