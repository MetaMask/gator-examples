export const content = [
  './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
  './src/components/**/*.{js,ts,jsx,tsx,mdx}',
  './src/app/**/*.{js,ts,jsx,tsx,mdx}',
];
export const theme = {
  extend: {
    colors: {
      background: 'var(--background)',
      foreground: 'var(--foreground)',
    },
    fontFamily: {
      'geist-sans': ['var(--font-geist-sans)'],
      'geist-mono': ['var(--font-geist-mono)'],
    },
  },
};
export const plugins = [];
export const darkMode = 'media';
