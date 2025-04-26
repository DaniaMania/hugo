/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
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
    },
  },
  plugins: [],
};
