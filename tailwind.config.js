/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      backgroundImage: {
        'pattern-dark': "url('https://www.toptal.com/designers/subtlepatterns/patterns/cubes.png')", // Example background pattern
      },
      fontFamily: {
        custom: ['Your Custom Font', 'sans-serif'], // Add your custom font here
      },
      boxShadow: {
        shiny:
          '0 4px 6px rgba(0, 0, 0, 0.1), 0 1px 3px rgba(255, 255, 255, 0.5)',
      },
      boxShadow: {
        'custom-lg': '0 10px 20px rgba(0, 0, 0, 0.1)', // Adjust the rgba value for desired shadow
      },
      keyframes: {
        slideInDown: {
          '0%': { transform: 'translateY(-100%)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        slideOutDown: {
          '0%': { transform: 'translateY(0)', opacity: '1' },
          '100%': { transform: 'translateY(100%)', opacity: '0' },
        },
        slideUp: {
          '0%': { transform: 'translateY(50px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        starBlink: {
          '0%, 100%': { borderColor: 'transparent' }, // Border disappears
          '50%': { borderColor: 'rgba(255, 255, 255, 0.8)' }, // Border shines brightly
        },
      },
      animation: {
        slideInDown: 'slideInDown 1s ease-out',
        slideOutDown: 'slideOutDown 1s ease-in',
        slideUp: 'slideUp 0.8s ease-out',
        starBlink: 'starBlink 1.5s infinite ease-in-out',

      },
    },
    screens: {
      sm: '640px',
      md: '768px',
      lg: '1024px',
      xl: '1280px',
      '2xl': '1536px',
    },
    fontFamily: {
      sans: ['Graphik', 'sans-serif'],
      serif: ['Merriweather', 'serif'],
    },
  },
  variants: {
    backdropBlur: ['responsive'],
  },
  plugins: [],
};
