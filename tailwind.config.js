/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'finako-green': {
          DEFAULT: '#20c997',
          dark: '#169c74',
          light: '#5ee7c2',
        },
      },
    },
  },
  plugins: [require('daisyui')],
  daisyui: {
    themes: [
      {
        finako: {
          'primary': '#20c997',
          'primary-focus': '#169c74',
          'primary-content': '#ffffff',
        },
      },
    ],
  },
}
