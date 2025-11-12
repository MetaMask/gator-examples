# MetaMask Smart Accounts & Dynamic Quickstart

This is a NextJS MetaMask Smart Accounts starter & Dynamic Quickstart created with [`@metamask/create-gator-app`](https://www.npmjs.com/package/@metamask/create-gator-app).

This template is meant to help you bootstrap your own projects with Metamask Smart Acounts. It helps you build smart accounts with account abstraction, and powerful delegation features.

Learn more about [Metamask Smart Accounts](https://docs.metamask.io/smart-accounts-kit/concepts/smart-accounts/).

## Prerequisites

1. **Pimlico API Key**: In this template, you’ll use Pimlico’s 
bundler and paymaster services to submit user operations and 
sponsor transactions. You can get your API key from [Pimlico’s dashboard](https://dashboard.pimlico.io/apikeys).

2. **Dynmaic ENV ID**: Please create a new project on Dynamic Dashboard, and get your Client ID. 

## Project structure

```bash
template/
├── public/ # Static assets
├── src/
│ ├── app/ # App router pages
│ ├── components/ # UI Components
│ ├── hooks/ # Custom React hooks
│ ├── providers/ # Custom React Context Provider
│ └── utils/ # Utils for the starter
├── .env # Environment variables
├── .gitignore # Git ignore rules
├── next.config.ts # Next.js configuration
└── tsconfig.json # TypeScript configuration
```

## Setup environment variables

Update the following environment variables in the `.env` file at 
the root of your project.

```
NEXT_PUBLIC_PIMLICO_API_KEY =

# Enter your Dynamic ENV ID
NEXT_PUBLIC_DYNAMIC_ENV_ID =
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

Open [http://localhost:3000](http://localhost:3000) in your browser to view the app.

## Learn more

To learn more about MetaMask Smart Accounts, take a look at the following resources:

- [Quickstart](https://docs.metamask.io/smart-accounts-kit/get-started/smart-account-quickstart/) - Get started quickly with the MetaMask Smart Accounts
- [Delegation quickstart](https://docs.metamask.io/smart-accounts-kit/guides/delegation/execute-on-smart-accounts-behalf/) - Get started quickly with creating a MetaMask smart account and completing the delegation lifecycle (creating, signing, and redeeming a delegation).