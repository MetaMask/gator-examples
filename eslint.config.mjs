import base, { createConfig } from '@metamask/eslint-config';
import nodejs from '@metamask/eslint-config-nodejs';
import typescript from '@metamask/eslint-config-typescript';
import vitest from '@metamask/eslint-config-vitest';

const config = createConfig([
  {
    ignores: ['dist/', 'docs/', '.yarn/', 'templates/'],
  },
  {
    extends: base,
    languageOptions: {
      sourceType: 'module',
      parserOptions: {
        tsconfigRootDir: import.meta.dirname,
      },
    },
    settings: {
      'import-x/extensions': ['.js', '.mjs'],
    },
  },
  {
    files: ['**/*.ts'],
    extends: typescript,
    rules: {
      'jsdoc/require-jsdoc': 'off',
      'import-x/no-nodejs-modules': 'off',
      'import-x/no-named-as-default-member': 'off',
      'no-restricted-globals': 'off',
      'no-restricted-syntax': 'off',
      '@typescript-eslint/parameter-properties': 'off',
      '@typescript-eslint/explicit-function-return-type': 'off',
      '@typescript-eslint/no-non-null-assertion': 'off',
      '@typescript-eslint/prefer-promise-reject-errors': 'off',
      'no-param-reassign': 'off',
      'id-length': 'off',
      'require-unicode-regexp': 'off',
    },
  },
  {
    files: ['**/*.js', '**/*.cjs'],
    extends: nodejs,
    languageOptions: {
      sourceType: 'script',
    },
  },
  {
    files: ['**/*.test.ts', '**/*.test.js'],
    extends: [vitest, nodejs],
  },
]);

export default config;
