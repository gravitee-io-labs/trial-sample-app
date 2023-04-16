/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "hsl(var(--color-primary) / <alpha-value>)",
        "accent-cyan": "hsl(var(--color-accent-cyan) / <alpha-value>)",
        "accent-portage": "hsl(var(--color-accent-portage) / <alpha-value>)",
        "accent-rose": "hsl(var(--color-accent-rose) / <alpha-value>)",
        "accent-orange": "hsl(var(--color-accent-orange) / <alpha-value>)",
        contrast: "hsl(var(--color-contrast) / <alpha-value>)",
      },
    },
    plugins: [],
  },
};