/* eslint-disable @typescript-eslint/no-namespace */

declare global {
  namespace Cypress {
    interface Chainable {
      /** Prepare intercept to be able to inspect network activity for idle detection */
      waitForNetworkIdlePrepare(): void

      /** Wait for the network to be idle before continuing */
      waitForNetworkIdle(options?: WaitForNetworkIdleOptions): void
    }
  }
}

interface WaitForNetworkIdleOptions {
  /** The maximum time (in ms) to wait for the network to idle */
  timeout?: number

  /** The time (in ms) to wait for another request after network activity ceases */
  minIdleTime?: number
}

const NETWORK_ACTIVITY_ENV_KEY = 'waitForNetworkIdle__networkActivity'

interface NetworkActivity {
  pendingRequests: number
  completedRequests: number
}

export function addWaitForNetworkIdleCommand() {
  Cypress.Commands.add('waitForNetworkIdlePrepare', function () {
    const networkActivity: NetworkActivity = {
      pendingRequests: 0,
      completedRequests: 0,
    }

    Cypress.env(NETWORK_ACTIVITY_ENV_KEY, networkActivity)

    cy.intercept('*', (request) => {
      networkActivity.pendingRequests++

      request.on('response', () => {
        networkActivity.pendingRequests--
        networkActivity.completedRequests++
      })
    })
  })

  Cypress.Commands.add('waitForNetworkIdle', function (pOptions?: WaitForNetworkIdleOptions) {
    const options = { timeout: 2000, minIdleTime: 200, ...pOptions }

    return cy.wrap(null).then({ timeout: options.timeout }, () => {
      const networkActivity = Cypress.env(NETWORK_ACTIVITY_ENV_KEY) as NetworkActivity

      return new Cypress.Promise(($resolve) => {
        let prevCompletedRequests: number

        function checkNetworkIdle() {
          const networkIdle =
            networkActivity.pendingRequests === 0 &&
            networkActivity.completedRequests === prevCompletedRequests

          if (networkIdle) {
            return $resolve()
          }

          prevCompletedRequests = networkActivity.completedRequests
          setTimeout(checkNetworkIdle, options.minIdleTime)
        }

        checkNetworkIdle()
      })
    })
  })
}
