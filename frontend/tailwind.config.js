/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      backgroundImage: {
        landing: `
        radial-gradient(at 100% 100%, rgb(55, 48, 163) 0, transparent 52%), radial-gradient(at 83% 100%, rgb(233, 213, 255) 0, transparent 29%), radial-gradient(at 0% 100%, rgb(30, 64, 175) 0, transparent 36%), radial-gradient(at 15% 100%, rgb(165, 180, 252) 0, transparent 40%);`
  ,
      },
    },
  },
  plugins: [],
};
