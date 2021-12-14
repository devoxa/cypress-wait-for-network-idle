describe('cypress-wait-for-network-idle', () => {
  it('waits for the network to idle before finishing the test', () => {
    cy.visit('https://example.com')
    cy.waitForNetworkIdle()
    cy.get('h1').should('contain', 'Example')
  })
})
