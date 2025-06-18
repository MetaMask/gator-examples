# Create Gator App

A CLI tool to quickly scaffold new MetaMask Delegator applications with best practices and modern tooling.

[![npm version](https://img.shields.io/npm/v/create-gator-app.svg)](https://www.npmjs.com/package/create-gator-app)
[![License](https://img.shields.io/npm/l/create-gator-app.svg)](https://github.com/yourusername/hello-gator-internal/blob/main/LICENSE)

## Overview

`create-gator-app` provides a streamlined way to create new MetaMask Delegator applications with pre-configured templates. It sets up a project structure with all the necessary dependencies and configurations to get you started quickly.

## Usage

You can create a new application without installing the package by using `npx`:

```bash
npx create-gator-app
```

The CLI will guide you through the setup process with a series of prompts:

1. **Project Name**: Name of your project (default: my-metamask-app)
2. **Package Manager**: Choose between npm, yarn, or pnpm
3. **Template**: Select a template for your project

After answering these prompts, the CLI will:

1. Create a new directory with your project name
2. Copy the template files
3. Install dependencies

Once completed, you can navigate to your project directory and start the development server:

```bash
cd your-project-name
npm run dev  # or yarn dev, pnpm dev
```

## Available Templates

Currently, the following templates are available:

- **nextjs-starter**: A basic Next.js template with App Router, configured for MetaMask Delegator integration
- **vite-react-starter**: A basic ReactJS template configured for MetaMask Delegator integration
- **nextjs-ERC-7715-starter**: A basic Next.js tempalte with App Router, configured for ERC-7715 actions with Delgation Toolkit

## License

[MIT](LICENSE)

## Related Projects

- [MetaMask Delegation Toolkit Docs](https://docs.metamask.io/delegation-toolkit/)