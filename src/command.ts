/* eslint-disable @typescript-eslint/no-namespace */

interface WaitForNetworkIdleOptions {
  /** The maximum time to wait (in ms) for the network to idle */
  timeout?: number

  /** The time to wait (in ms) after network activity ceases */
  minIdleTime?: number
}

declare global {
  namespace Cypress {
    interface Chainable {
      /** Wait for the network to be idle before continuing */
      waitForNetworkIdle(options?: WaitForNetworkIdleOptions): void
    }
  }
}

export function addWaitForNetworkIdleCommand() {
  Cypress.Commands.add('waitForNetworkIdle', function (pOptions?: WaitForNetworkIdleOptions) {
    const options = { timeout: 2000, minIdleTime: 200, ...pOptions }

    return cy.window().then({ timeout: options.timeout }, ($window) => {
      return new Cypress.Promise((resolve) => {
        let timeout = $window.setTimeout(resolve, options.minIdleTime)

        const observer = new $window.PerformanceObserver(() => {
          $window.clearTimeout(timeout)
          timeout = $window.setTimeout(resolve, options.minIdleTime)
        })

        observer.observe({ entryTypes: ['resource'] })
      })
    })
  })
}
