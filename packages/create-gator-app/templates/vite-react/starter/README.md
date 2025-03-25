# Vite React Gator Starter Template

This is a Vite React Gator Starter template created with create-gator-app.

This template is meant to help you bootstrap your own projects with [Metamask Delegation Toolkit](https://metamask.io/developer/delegation-toolkit). It helps you build smart accounts with account abstraction, and powerful delegation features.

Learn more about [Metamask Delegation Toolkit](https://metamask.io/developer/delegation-toolkit).

## Prerequisites

1. **Pimlico API Key**: In this template, we use Pimlico’s Bundler and Paymaster services to submit user operations and sponsor transactions, respectively. You can retrieve the required API key from [Pimlico’s Dashboard](https://dashboard.pimlico.io/apikeys).

2. **Web3Auth Client ID**: During setup, if you choose the embedded wallet option, you’ll need to create a new project on the Web3Auth Dashboard and obtain the Client ID. For full instructions, [refer to the Web3Auth documentation](https://web3auth.io/docs/dashboard-setup#getting-started).

## Project Structure

```bash
vite-react-starter/
├── public/ # Static assets
├── src/
│ ├── App.tsx # Main App component
│ ├── main.tsx # Entry point
│ ├── App.css # App-specific styles
│ ├── index.css # Global styles
│ ├── components/ # UI Components
│ ├── hooks/ # Custom React hooks
│ ├── providers/ # Custom React Context Provider
│ ├── connectors(optional)/ # Web3Auth connector for Wagmi
│ └── utils/ # Utils for the starter
├── .env # Environment variables
├── .gitignore # Git ignore rules
├── vite.config.ts # Vite configuration
└── tsconfig.json # TypeScript configuration
```

## Setup Enviroment Variables

Update the following environment variables in the `.env` file located in your project's root directory.

```
VITE_PIMLICO_API_KEY =

# Specify the Web3Auth Client ID if you opt
# for the embedded wallet option.
VITE_WEB3AUTH_CLIENT_ID =

# The Web3Auth network is configured according to
# the your chosen Web3Auth network input.
VITE_WEB3AUTH_NETWORK =
```

## Getting Started

First, start the development server using the package manager you selected during setup.

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [localhost:5173](http://localhost:5173/) with your browser to see the result.

## Learn More

To learn more about Delegation Toolkit, take a look at the following resources:

- [Delegation Toolkit Documentation](https://docs.gator.metamask.io/) - learn about Delegation Toolkit features and API.
