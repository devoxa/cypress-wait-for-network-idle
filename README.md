<!-- Title -->
<h1 align="center">
  cypress-wait-for-network-idle
</h1>

<!-- Description -->
<h4 align="center">
  Wait for the network to be idle before continuing during Cypress runs.
</h4>

<!-- Badges -->
<p align="center">
  <a href="https://www.npmjs.com/package/@devoxa/cypress-wait-for-network-idle">
    <img
      src="https://img.shields.io/npm/v/@devoxa/cypress-wait-for-network-idle?style=flat-square"
      alt="Package Version"
    />
  </a>

  <a href="https://github.com/devoxa/cypress-wait-for-network-idle/actions?query=branch%3Amaster+workflow%3A%22Continuous+Integration%22">
    <img
      src="https://img.shields.io/github/workflow/status/devoxa/cypress-wait-for-network-idle/Continuous%20Integration?style=flat-square"
      alt="Build Status"
    />
  </a>
</p>

<!-- Quicklinks -->
<p align="center">
  <a href="#installation">Installation</a> •
  <a href="#usage">Usage</a> •
  <a href="#contributors">Contributors</a> •
  <a href="#license">License</a>
</p>

<br>

## Installation

1. Install the package

```bash
yarn add --dev @devoxa/cypress-wait-for-network-idle
```

2. Import the command in `cypress/support/commands.ts`:

```ts
import { addWaitForNetworkIdleCommand } from '@devoxa/cypress-wait-for-network-idle/command'
addWaitForNetworkIdleCommand()
```

## Usage

```ts
describe('SignInPage', () => {
  it('waits for network requests', () => {
    cy.waitForNetworkIdlePrepare()
    cy.visit('/sign-in')
    cy.waitForNetworkIdle()
  })

  it('waits for network requests that have a delay between them', () => {
    cy.waitForNetworkIdlePrepare()
    cy.visit('/sign-in')
    cy.waitForNetworkIdle({ minIdleTime: 500 })
  })
})
```

Additional available options:

- `timeout`: The maximum time (in ms) to wait for the network to idle, defaults to `2000`
- `minIdleTime`: The time (in ms) to wait for another request after network activity ceases,
  defaults to `200`

## Contributors

Thanks goes to these wonderful people ([emoji key](https://allcontributors.org/docs/en/emoji-key)):

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->
<table>
  <tr>
    <td align="center"><a href="https://www.david-reess.de"><img src="https://avatars3.githubusercontent.com/u/4615516?v=4" width="75px;" alt=""/><br /><sub><b>David Reeß</b></sub></a><br /><a href="https://github.com/devoxa/cypress-wait-for-network-idle/commits?author=queicherius" title="Code">💻</a> <a href="https://github.com/devoxa/cypress-wait-for-network-idle/commits?author=queicherius" title="Documentation">📖</a> <a href="https://github.com/devoxa/cypress-wait-for-network-idle/commits?author=queicherius" title="Tests">⚠️</a></td>
  </tr>
</table>

<!-- markdownlint-enable -->
<!-- prettier-ignore-end -->

<!-- ALL-CONTRIBUTORS-LIST:END -->

This project follows the [all-contributors](https://github.com/all-contributors/all-contributors)
specification. Contributions of any kind welcome!

## License

MIT
