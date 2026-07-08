/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#6722B5',
          dark: '#4F1A8A',
          light: '#8B4DD4',
        },
        background: {
          DEFAULT: '#FAFAFA',
          light: '#FFFFFF',
        },
        text: {
          DEFAULT: '#1A1A1A',
          light: '#666666',
        }
      },
      fontFamily: {
        heading: ['Poppins', 'sans-serif'],
        sans: ['Inter', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
