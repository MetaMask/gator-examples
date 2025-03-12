# Gator Examples

A monorepo containing the example applications for building apps with Metamask Delegation Tookit (https://docs.gator.metamask.io/)

## Overview

This repository contains:

1. **Example Applications**: Ready-to-use applications showcasing delegation patterns
2. **create-gator-app**: CLI tool to bootstrap new projects with delegation capabilities

## Repository Structure

```
gator-examples/
├── examples/           # Example applications built with the Delegation Toolkit
├── packages/
│   └── create-gator-app/  # CLI tool for bootstrapping new projects
└── ...
```

## Examples

The `/examples` directory contains various applications demonstrating how to implement delegation patterns using the Delegation Toolkit. Each example showcases different use cases and implementation approaches.

To run an example:

```bash
# Navigate to an example directory
cd examples/example-name

# Install dependencies
npm install

# Start the development server
npm run dev
```

## create-gator-app

The `create-gator-app` package is a CLI tool that helps you bootstrap a new project with delegation capabilities. It provides a simple template for local development.

### Usage

```bash
# Using npx
npx create-gator-app

# Or install globally
npm install -g create-gator-app
create-gator-app
```

## Development

### Prerequisites

- Node.js (v22 or later)
- npm or yarn

### Setup

```bash
# Clone the repository
git clone https://github.com/chin-flags/gator-examples
cd gator-examples

# Install dependencies
npm install

# Build all packages
npm run build
```

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

[Add your license information here]
