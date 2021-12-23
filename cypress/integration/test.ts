describe('cypress-wait-for-network-idle', () => {
  it('waits for the network to idle before continuing (no requests)', () => {
    cy.visit('http://localhost:8080/no-requests')
    cy.waitForNetworkIdle()
    cy.get('h1', { timeout: 0 }).should('contain', 'Done')
  })

  it('waits for the network to idle before continuing (fast requests)', () => {
    cy.visit('http://localhost:8080/fast-requests')
    cy.waitForNetworkIdle()
    cy.get('h1', { timeout: 0 }).should('contain', 'Done')
  })

  it('waits for the network to idle before continuing (delayed fast requests)', () => {
    cy.visit('http://localhost:8080/delayed-fast-requests')
    cy.waitForNetworkIdle({ timeout: 5000, minIdleTime: 500 })
    cy.get('h1', { timeout: 0 }).should('contain', 'Done')
  })

  it('waits for the network to idle before continuing (slow requests)', () => {
    cy.visit('http://localhost:8080/slow-requests')
    cy.waitForNetworkIdle({ timeout: 10000, minIdleTime: 200 })
    cy.get('h1', { timeout: 0 }).should('contain', 'Done')
  })

  it('waits for the network to idle before continuing (delayed slow requests)', () => {
    cy.visit('http://localhost:8080/delayed-slow-requests')
    cy.waitForNetworkIdle({ timeout: 10000, minIdleTime: 500 })
    cy.get('h1', { timeout: 0 }).should('contain', 'Done')
  })
})
