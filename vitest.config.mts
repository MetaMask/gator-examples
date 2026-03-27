import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    watch: false,

    include: ['src/**/*.test.ts'],

    coverage: {
      enabled: true,

      provider: 'istanbul',

      include: [
        'src/**/*.ts',
        'src/**/*.tsx',
        'src/**/*.js',
        'src/**/*.jsx',
        'src/**/*.mjs',
      ],

      exclude: ['src/**/*.test-d.ts'],

      thresholds: {
        autoUpdate: true,

        branches: 100,
        functions: 100,
        lines: 100,
        statements: 100,
      },
    },

    typecheck: {
      enabled: true,

      tsconfig: './tsconfig.test.json',
    },
  },
});
