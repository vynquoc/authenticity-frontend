module.exports = {
  mode: 'jit',
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html', './src/components/*.{js,jsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      animation: {
        'success-check': 'grow 0.2s ease-in-out',
        'modal-open': 'slideDown 0.4s ease-in-out',
        'slide-left': 'slideToLeft 0.5s forwards'
      },
      keyframes: {
        grow: {
          '0%': { transform: 'scale(0)' },
          '100%': { transform: 'scale(1)' }
        },
        slideDown: {
          '0%': { opacity: 0 },
          '100%': { opacity: 1 }
        },
        slideToLeft: {
          from: {
            right: '-300px'
          }, 
          to: {
            right: 0
          } 
        }
      }
    },
    fontFamily: {
      montserrat: 'Montserrat',
      righteous: 'Righteous'
    },
  },
  variants: {
    extend: {
      backgroundColor: ['active'],
    },
  },
  plugins: [
    require('@tailwindcss/line-clamp'),
  ],
}
