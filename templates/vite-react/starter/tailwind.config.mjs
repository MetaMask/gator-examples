export const content = ['./src/**/*.{js,ts,jsx,tsx}', './index.html'];
export const theme = {
  extend: {
    colors: {
      background: 'var(--background)',
      foreground: 'var(--foreground)',
    },
    fontFamily: {
      'geist-sans': ['Geist', 'sans-serif'],
      'geist-mono': ['Geist Mono', 'monospace'],
    },
  },
};
export const plugins = [];
export const darkMode = 'media';
