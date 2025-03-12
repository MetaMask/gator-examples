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
4. Set up the project configuration

> **Note about Private Packages**: The templates include `@metamask-private/delegator-core-viem`, which is a private package. The CLI uses an NPM authentication token stored in `config.ts` (for development) or hardcoded in the published package to access this private package during installation. End users don't need to configure anything manually when using the published CLI.

Once completed, you can navigate to your project directory and start the development server:

```bash
cd your-project-name
npm run dev  # or yarn dev, pnpm dev
```

## Available Templates

Currently, the following templates are available:

- **nextjs-starter**: A basic Next.js template with App Router, configured for MetaMask Delegator integration

## Development

### Prerequisites

- Node.js (v14 or higher)
- npm, yarn, or pnpm

### Local Development

To work on `create-gator-app` locally:

1. Clone the repository:
   ```bash
   git clone https://github.com/chin-flags/gator-examples.git
   cd gator-examples
   ```

2. Install dependencies:
   ```bash
   pnpm install
   ```

3. Navigate to the package directory:
   ```bash
   cd packages/create-gator-app
   ```

4. Create a `config.ts` file in the root of the package with your NPM authentication token:
   ```typescript
   export const NPM_AUTH_TOKEN = "your-npm-auth-token";
   ```
   This token is required to access the private package `@metamask-private/delegator-core-viem` during development.

5. Build the package:
   ```bash
   pnpm build
   ```

6. Link the package globally to test it:
   ```bash
   npm link
   ```

7. Run the CLI:
   ```bash
   create-gator-app
   ```

For development with auto-reloading:
```bash
pnpm dev
```

### Running Tests

```bash
pnpm test
```

To run tests in watch mode:
```bash
pnpm test:watch
```

## Contributing

### Adding a New Template

To add a new template to `create-gator-app`:

1. Create a new directory in the `templates` folder with your template name:
   ```bash
   mkdir -p templates/your-template-name
   ```

2. Add all necessary files for your template. At minimum, include:
   - `package.json` with all required dependencies
   - Basic project structure
   - Configuration files (e.g., `.env.example`, `tsconfig.json`, etc.)
   - A README.md explaining the template

3. Update the `TEMPLATES` array in `src/lib/templates.ts` to include your new template:
   ```typescript
   export const TEMPLATES = [
     // ... existing templates
     {
       name: "Your Template Display Name",
       value: "your-template-name",
       description: "A brief description of your template",
     }
   ];
   ```

4. If your template requires special installation steps, update the installation logic in `src/lib/templates.ts` or create a new function for your template.

5. Test your template by building the CLI and creating a new project with your template.

### Template Best Practices

When creating a template:

1. Keep dependencies up-to-date
2. Include comprehensive documentation
3. Follow security best practices
4. Provide example code that demonstrates MetaMask Delegator functionality
5. Include proper TypeScript types
6. Add appropriate ESLint and Prettier configurations
7. Include a `.env.example` file with required environment variables

### Submitting Changes

1. Fork the repository
2. Create a new branch for your changes
3. Make your changes
4. Run tests to ensure everything works
5. Submit a pull request

## License

[MIT](LICENSE)

## Related Projects

- [MetaMask Delegation Toolkit](https://docs.gator.metamask.io/)
- [MetaMask SDK](https://docs.metamask.io/sdk/)