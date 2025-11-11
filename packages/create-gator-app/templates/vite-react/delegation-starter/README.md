# MetaMask Smart Accounts & Delegation Template

This is a React MetaMask Smart Accounts & Delegation template created with [`@metamask/create-gator-app`](https://npmjs.com/package/@metamask/create-gator-app).

This template is meant to help you bootstrap your own projects with Metamask Smart Acounts. It helps you build smart accounts with account abstraction, and powerful delegation features.

Learn more about [Metamask Smart Accounts](https://docs.metamask.io/smart-accounts-kit/concepts/smart-accounts/).

## Prerequisites

1. **Pimlico API Key**: In this template, you’ll use Pimlico’s 
bundler and paymaster services to submit user operations and 
sponsor transactions. You can get your API key from [Pimlico’s dashboard](https://dashboard.pimlico.io/apikeys).

2. **Web3Auth Client ID**: During setup, if you used the 
`-add-web3auth` flag, you’ll need to create a new project on the 
Web3Auth Dashboard and get your Client ID. You can follow the [Web3Auth documentation](https://web3auth.io/docs/dashboard-setup#getting-started).

## Project structure

```bash
template/
├── public/ # Static assets
├── src/
│ ├── App.tsx # Main App component
│ ├── main.tsx # Entry point
│ ├── index.css # Global styles
│ ├── components/ # UI Components
│ ├── hooks/ # Custom React hooks
│ ├── providers/ # Custom React Context Provider
│ └── utils/ # Utils for the starter
├── .env # Environment variables
├── .gitignore # Git ignore rules
├── vite.config.ts # Vite configuration
└── tsconfig.json # TypeScript configuration
```

## Setup environment variables

Update the following environment variables in the `.env` file at 
the root of your project.

```
VITE_PIMLICO_API_KEY =

# Enter your Web3Auth Client ID if you 
# used the --add-web3auth flag.
VITE_WEB3AUTH_CLIENT_ID =

# The Web3Auth network is configured based 
# on the network option you selected during setup.
VITE_WEB3AUTH_NETWORK =
```

## Getting started

First, start the development server using the package manager 
you chose during setup.

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser to view the app.

## Learn more

To learn more about MetaMask Smart Accounts, take a look at the following resources:

- [MetaMask Smart Accounts Quickstart](https://docs.metamask.io/smart-accounts-kit/get-started/smart-account-quickstart/) - Get started quickly with the MetaMask Smart Accounts
- [Delegation guide](https://docs.metamask.io/smart-accounts-kit/guides/delegation/execute-on-smart-accounts-behalf/) - Get started quickly with creating a MetaMask smart account and completing the delegation lifecycle (creating, signing, and redeeming a delegation).