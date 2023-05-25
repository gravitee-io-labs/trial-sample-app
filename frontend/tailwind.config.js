/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          100: "#D6FFFF",
          200: "#91FFFF",
          300: "#45FFFF",
          400: "#0BD2D2",
          500: "#009999",
          600: "#007A7A",
          700: "#005C5C",
          800: "#003D3D",
          900: "#001F1F",
        },
        accent: {
          100: "#E7E2FB",
          200: "#CFC5F7",
          300: "#B7A9F4",
          400: "#9F8CF0",
          500: "#876FEC",
          600: "#6C59BD",
          700: "#51438E",
          800: "#362C5E",
          900: "#1B162F",
        },
        "space-neutral": {
          100: "#BBBCC4",
          200: "#A4A5B0",
          300: "#8E8F9C",
          400: "#777888",
          500: "#606274",
          600: "#494B61",
          700: "#33354D",
          800: "#1C1E39",
          900: "#100C27",
        },
        "dove-neutral": {
          100: "#F7F8FD",
          200: "#E7E8EF",
          300: "#D3D5DC",
          400: "#B4B5BB",
          500: "#98999F",
          600: "#7A7B80",
          700: "#616266",
          800: "#49494C",
          900: "#313133",
        },
      },
    },
    plugins: [require("flowbite/plugin")],
  },
};
