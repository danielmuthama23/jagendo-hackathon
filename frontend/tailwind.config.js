const { fontFamily } = require('tailwindcss/defaultTheme')

module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}'
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-inter)', ...fontFamily.sans],
        display: ['var(--font-clash)', ...fontFamily.sans]
      },
      colors: {
        primary: {
          DEFAULT: '#6366f1',
          dark: '#4f46e5'
        },
        jagedo: {
          success: '#22c55e',
          warning: '#f59e0b',
          danger: '#ef4444',
          surface: '#1e293b'
        }
      }
    }
  },
  plugins: [
    require('@tailwindcss/typography'),
    require('tailwindcss-animate')
  ]
}