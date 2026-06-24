/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: '#0A0A0A',
        primary: '#FF6B00',
        secondary: '#00D4FF',
        success: '#22C55E',
        dark: '#121212',
        glass: 'rgba(255, 255, 255, 0.05)',
        glassBorder: 'rgba(255, 255, 255, 0.1)',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
