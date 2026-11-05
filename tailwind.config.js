/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      colors: {
        navy: {
          primary: '#101C2E',
          secondary: '#1B2C45',
        },
        accent: {
          blue: '#4D8FE8',
        },
        ui: {
          lightBg: '#F4F6F9',
          white: '#FFFFFF',
        },
        status: {
          success: '#279B71',
          warning: '#D69B43',
          danger: '#D65B62',
        }
      },
    },
  },
  plugins: [],
}