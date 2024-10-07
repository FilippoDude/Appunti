
/** @type {import('tailwindcss').Config} */
export default {
  mode: 'jit',
  content: [
    // Example content paths...
    './index.html',
    './src/**/*.{js,jsx,ts,tsx,vue}',
  ],
  safelist: [
  ],
  theme: {
    extend: {
      keyframes: {
        fadeIn:{
          '0%': {opacity: '0'},
          '100%': {opacity: '1'}
        },
        fromBelow:{
          '0%': {transform: 'translateY(100%)', opacity: '0'},
          '100%': {transform: 'translateY(0)', opacity: '1'}
        },
        toBelowBlock:{
          '0%': {transform: 'translateY(0)', opacity: '1', display: 'block'},
          '100%': {transform: 'translateY(100%)', opacity: '0'}
        },
        activeYellow:{
          '0%': { backgroundColor: '#ffffff' }, /* Start color (white) */
          '100%': { backgroundColor: '#ffeb3b' },
        },
        fromLeft:{
          '0%': {transform: 'translateX(-100%)', opacity: '0'},
          '100%': {transform: 'translateX(0)', opacity: '1'}
        },
        fromRight:{
          '0%': {transform: 'translateX(100%)', opacity: '0'},
          '100%': {transform: 'translateX(0)', opacity: '1'}
        },
      },
      animation: {
        fadeIn: 'fadeIn 0.2s ease-in-out',
        fromBelow: 'fromBelow 0.1s linear',
        toBelowBlock: 'toBelowBlock 0.5s ease-in-out',
        activeYellow: 'activeYellow 0.1s ease-in-out',
        fromLeft: 'fromLeft 0.5s ease-in-out',
        fromRight: 'fromRight 0.5s ease-in-out',
      }

    },
  },
  plugins: [],
}

