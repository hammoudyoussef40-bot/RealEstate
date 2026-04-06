import type { Config } from 'tailwindcss'

export default {
  content: ['./index.html', './src/**/*.{vue,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        slate: {
          950: '#08111f'
        },
        gold: {
          600: '#c89b3c'
        }
      },
      boxShadow: {
        panel: '0 24px 80px rgba(8, 17, 31, 0.16)'
      },
      fontFamily: {
        display: ['"Montserrat"', 'sans-serif'],
        body: ['"Inter"', 'sans-serif']
      }
    }
  },
  plugins: []
} satisfies Config
