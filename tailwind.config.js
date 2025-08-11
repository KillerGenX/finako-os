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
          'secondary': '#6c757d',
          'secondary-focus': '#5a6268',
          'secondary-content': '#ffffff',
          'accent': '#0dcaf0',
          'accent-focus': '#0ba1c7',
          'accent-content': '#ffffff',
          'neutral': '#212529',
          'neutral-focus': '#1a1e21',
          'neutral-content': '#ffffff',
          'base-100': '#ffffff',
          'base-200': '#f8f9fa',
          'base-300': '#e9ecef',
          'base-content': '#212529',
          'info': '#0dcaf0',
          'success': '#20c997',
          'warning': '#ffc107',
          'error': '#dc3545',
        },
      },
      'light',
      'dark'
    ],
    defaultTheme: 'finako',
  },
}
