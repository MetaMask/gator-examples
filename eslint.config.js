import { defineConfig } from "eslint/config";

export default defineConfig([
  {
    ignores: [
      '!.prettierrc.js',
      '**/!.eslintrc.js',
      '**/dist*/',
      'packages/create-gator-app/templates/*',
      '**/*__GENERATED__*',
      '**/build',
      '**/public',
      '**/.cache',
    ],
  },
]);
