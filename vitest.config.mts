import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    watch: false,
    passWithNoTests: true,
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
        branches: 0,
        functions: 0,
        lines: 0,
        statements: 0,
      },
    },
    typecheck: {
      enabled: true,

      tsconfig: './tsconfig.test.json',
    },
  },
});
