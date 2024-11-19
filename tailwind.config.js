/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all of your component files.
  content: ["./app/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        primary: '#f5f6ff',
        secondary: {
          DEFAULT: '#2c7cf5',
          100: '#94bfff',
          200: '#629df5'
        },
        white: {
          DEFAULT: '#ffffff',
          100: '#fff8e6',
          200: '#d1d1d1'
        }

      },
      fontFamily: {
        ysk:["Yuji Syuku"]
      },
    },
  },
  plugins: [],
}