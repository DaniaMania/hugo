/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        'inter': ['Inter', 'sans-serif'],
      },
      backgroundImage: {
        landing: `
          radial-gradient(at 100% 100%, rgba(20, 114, 255, 0.5) 0, transparent 52%),
          radial-gradient(at 83% 100%, rgba(255, 255, 255, 0.5) 0, transparent 29%),
          radial-gradient(at 0% 100%, rgba(123, 204, 255, 0.5) 0, transparent 36%),
          radial-gradient(at 15% 100%, rgba(20, 114, 255, 0.3) 0, transparent 40%)
        `,
      },
      colors: {
        primary: {
          50: '#f0f9ff',
          100: '#e0f2fe',
          200: '#bae6fd',
          300: '#7dd3fc',
          400: '#38bdf8',
          500: '#0ea5e9',
          600: '#0284c7',
          700: '#0369a1',
          800: '#075985',
          900: '#0c4a6e',
        },
      },
    },
  },
  plugins: [],
};
