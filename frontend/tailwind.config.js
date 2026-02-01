/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    fontFamily:{
      display:["Poppins","sans-serif"],
      mountain: ['"Mountain of Christmas"', 'cursive'],
    },
    extend: {
      colors: {
        primary: {
          light: '#38bdf8',
          dark: '#0ea5e9',
        },
        secondary:"#EF863E",
        lightCoral: '#F08080',
        background: {
          light: '#f0f9ff',
          dark: '#0f172a',
        },
        surface: {
          light: '#ffffff',
          dark: '#1e293b',
        },
        text: {
          light: '#1e293b',
          dark: '#f1f5f9',
        }
      },
      backgroundImage:{
        'login-bg-img':"url('./src/assests/images/bg-image.png')",
        'signup-bg-img':"url('./src/assests/images/signup-bg-img.png')",
      }
    },
  },
  plugins: [],
}

