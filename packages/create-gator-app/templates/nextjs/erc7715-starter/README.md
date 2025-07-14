# ERC-7715 permissions starter template

This is a NextJS ERC-7715 permissions starter template created with `@metamask/create-gator-app`.

This template is meant to help you bootstrap your own projects with [ERC-7715 permissions](https://docs.metamask.io/delegation-toolkit/experimental/erc-7715-request-permissions/). It helps you build 
a dApp with ERC-7715 support to request permissions and redeem them.

Learn more about [ERC-7715](https://eips.ethereum.org/EIPS/eip-7715).

## Prerequisites

1. **Pimlico API Key**: In this template, you’ll use Pimlico’s 
bundler and paymaster services to submit user operations and 
sponsor transactions. You can get your API key from [Pimlico’s dashboard](https://dashboard.pimlico.io/apikeys).


2. **RPC URL** In this template, you’ll need an RPC URL for the Sepolia chain. You can use a public 
RPC or any provider of your choice, but we recommend using a paid RPC for better reliability and to 
avoid rate-limiting issues.

## Project structure

```bash
template/
├── public/ # Static assets
├── src/
│ ├── app/ # App router pages
│ ├── components/ # UI Components
│ │ ├── CreateSessionAccount.tsx # Component for creating a session account
│ │ ├── GrantPermissionsButton.tsx # Component for granting permissions
│ │ ├── Hero.tsx # Hero section component
│ │ ├── InstallFlask.tsx # Component for installing MetaMask Flask
│ │ ├── Loader.tsx # Loading indicator component
│ │ ├── PermissionInfo.tsx # Component for displaying permission information
│ │ ├── RedeemPermissionButton.tsx # Component for redeeming permissions
│ │ ├── Steps.tsx # Step-by-step guide component
│ │ └── WalletInfoContainer.tsx # Component for displaying wallet information
│ ├── providers/ # React Context Providers
│ │ ├── PermissionProvider.tsx # Provider for permission state
│ │ └── SessionAccountProvider.tsx # Provider for session account state
│ ├── services/ # Service layer for API interactions
│ └── config.ts # Configuration settings
├── .env # Environment variables
├── .gitignore # Git ignore rules
├── next.config.ts # Next.js configuration
├── postcss.config.mjs # PostCSS configuration
├── tailwind.config.ts # Tailwind CSS configuration
└── tsconfig.json # TypeScript configuration
```

## Setup environment variables

Update the following environment variables in the `.env` file at 
the root of your project.

```
NEXT_PUBLIC_PIMLICO_API_KEY =
NEXT_PUBLIC_RPC_URL = 
```

## Getting started

First, start the development server using the package manager you chose during setup.

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to view the app.


## Application flow

This template demonstrates a complete ERC-7715 delegation flow:

1. **Create session account**: Users create a delegator smart account, which will be
used to redeem permissions.

2. **Grant permissions**: Users grant permissions to the session account by installing
MetaMask Snaps and approving the ERC-7715 permisison request.

3. **Redeem permissions**: The session account uses the granted permissions to perform
actions on behalf of the user.

## Learn more

To learn more about ERC-7715, take a look at the following resources:

- [ERC-7715 Request permissions](https://docs.metamask.io/delegation-toolkit/experimental/erc-7715-request-permissions/) - Learn how to request ERC-7715 request permissions.
- [ERC-7710 Redeem delegations](https://docs.metamask.io/delegation-toolkit/experimental/erc-7710-redeem-delegations/) - Learn how to redeem ERC-7715 granted permissions.

