# Gator Examples

A monorepo containing the example applications for building apps with Metamask Delegation Tookit (https://docs.gator.metamask.io/)

## Overview

This repository contains:

**create-gator-app**: CLI tool to bootstrap new projects with delegation capabilities

## Repository Structure

```
gator-examples/
├── packages/
│   └── create-gator-app/  # CLI tool for bootstrapping new projects
└── ...
```

## create-gator-app

The `create-gator-app` package is a CLI tool that helps you bootstrap a new project with delegation capabilities. It provides a simple template for local development.

### Usage

```bash
# Using npx
npx create-gator-app@latest

# Or install globally
npm install -g create-gator-app
create-gator-app
```

## Development

### Prerequisites

- Node.js (v22 or later)
- Yarn (required for create-gator-app development)
- npm or yarn (for examples)

### Setup

```bash
# Clone the repository
git clone https://github.com/chin-flags/gator-examples
cd gator-examples

# Install dependencies using yarn (required for create-gator-app)
yarn install

# Build all packages
yarn build
```

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

[Add your license information here]
