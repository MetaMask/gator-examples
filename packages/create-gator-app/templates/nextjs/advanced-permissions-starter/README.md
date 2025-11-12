# MetaMask Advanced Permissions (ERC-7715) Starter

This is a NextJS MetaMask Advanced Permissions (ERC-7715) starter created with [@metamask/create-gator-app](https://www.npmjs.com/package/@metamask/create-gator-app).

This template is meant to help you bootstrap your own projects with [Advanced Permissions (ERC-7715)](https://docs.metamask.io/smart-accounts-kit/guides/advanced-permissions/execute-on-metamask-users-behalf/). It helps you build 
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
│ │ ├── Button.tsx # Reusable button component
│ │ ├── ConnectButton.tsx # Component for connecting wallet
│ │ ├── CreateSessionAccount.tsx # Component for creating a session account
│ │ ├── Footer.tsx # Footer component
│ │ ├── GrantPermissionsButton.tsx # Component for granting permissions
│ │ ├── Hero.tsx # Hero section component
│ │ ├── PermissionInfo.tsx # Component for displaying permission information
│ │ ├── RedeemPermissionButton.tsx # Component for redeeming permissions
│ │ ├── Steps.tsx # Step-by-step guide component
│ │ ├── WalletInfo.tsx # Component for displaying wallet information
│ │ └── WalletInfoContainer.tsx # Container component for wallet information
│ ├── providers/ # React Context Providers
│ │ ├── AppProvider.tsx # Main app provider
│ │ ├── PermissionProvider.tsx # Provider for permission state
│ │ └── SessionAccountProvider.tsx # Provider for session account state
│ ├── services/ # Service layer for API interactions
│ │ ├── bundlerClient.ts # Bundler client configuration
│ │ └── pimlicoClient.ts # Pimlico client configuration
├── interfaces.d.ts # TypeScript interface definitions
├── .env # Environment variables
├── .gitignore # Git ignore rules
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


## Application Flow

This template demonstrates a complete Advanced Permissions (ERC-7715) flow:

1. **Create Session Account**: Users can create a session account that will be used to redeem permissions.
2. **Grant Permissions**: Users can grant Advanced Permissions to the session account.
3. **Redeem Permissions**: The session account can use the granted permissions to perform actions on behalf of the MetaMask user.

## Learn More

To learn more about Smart Accounts Kit, take a look at the following resources:

- [Advanced Permissions (ERC-7715) guide](https://docs.metamask.io/smart-accounts-kit/guides/advanced-permissions/execute-on-metamask-users-behalf/) - Learn how to use ERC-7715 permissions.
- [Smart Accounts Kit Documentation](https://docs.metamask.io/smart-accounts-kit/) - Learn more about Smart Accounts Kit features and API.