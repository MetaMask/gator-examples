# MetaMask Smart Accounts & Delegation Template

This is a React MetaMask Smart Accounts & Delegation template created with [`@metamask/create-gator-app`](https://npmjs.com/package/@metamask/create-gator-app).

This template is meant to help you bootstrap your own projects with MetaMask Smart Accounts. It helps you build smart accounts with account abstraction, and powerful delegation features.

Learn more about [MetaMask Smart Accounts](https://docs.metamask.io/smart-accounts-kit/concepts/smart-accounts/).

## Prerequisites

**Pimlico API Key**: In this template, we use Pimlico's Bundler and Paymaster services to submit user operations and sponsor transactions, respectively. You can retrieve the required API key from the [Pimlico Dashboard](https://dashboard.pimlico.io/apikeys).

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

## Setup Environment Variables

Update the following environment variables in the `.env` file at
the root of your project.

```
VITE_PIMLICO_API_KEY =
```

## Getting started

First, start the development server using the package manager
you chose during setup:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser to view the app.

## Learn more

See the [Smart Accounts Kit documentation](https://docs.metamask.io/smart-accounts-kit/) to learn more about its features and API.
