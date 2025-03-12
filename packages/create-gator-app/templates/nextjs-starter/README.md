# Hello Gator 🐊

Easily get up-to-speed with (and integrate) the MetaMask Delegation Toolkit with this demonstration. It includes examples for all the core elements including Delegator Account (ERC-4337) creation, sending User Operations, and the Delegation lifecycle. Example code is provided utilising the Delegator Smart Account.

Note: this template is also designed to complement the [documentation](https://docs.gator.metamask.io).

## Dependency Setup

> Note that the package `@metamask-private/delegator-core-viem` is a private package. When using this template through the `create-gator-app` CLI, a hardcoded npm token in the CLI will be automatically used to install this private package. For local development of the CLI itself, you'll need to create a `config.ts` file with `export const NPM_AUTH_TOKEN = "your-npm-auth-token";`. If you're setting up this project manually, please get in touch with the team for access at hellogators@consensys.io.

Once configured, you'll be able to install the dependencies (both private and public) via the following:

```sh
yarn install
```

## Configuration

Configuration is provided via environment variables, you may create a `.env` file in the root of Hello Gator, including the configuration parameters defined in `.env.example`.

Refer to the [documentation](https://docs.gator.metamask.io) for further information on configuration.

## Running

Start development environment:

```sh
yarn dev
```

## Support

Feel free to open an issue or contact the team directly at [hellogators@consensys.io](mailto:hellogators@consensys.io).
