/** @type {import('tailwindcss').Config} */
const labelsClasses = [
  "orange",
  "green",
  "red",
];


export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  safelist: [
    ...labelsClasses.map((lbl) => `bg-${lbl}-500`),
    ...labelsClasses.map((lbl) => `bg-${lbl}-200`),
    ...labelsClasses.map((lbl) => `text-${lbl}-400`)
  ],
  theme: {
    extend: {

      fontFamily: {
        sans: ["Open Sans"],
        pacifico: ['Pacifico', 'cursive'],
        handwriting: ['"Indie Flower"', 'cursive'],
      },
      
      gridTemplateColumns: {
        "1/5": "1fr 5fr"
      }
    },
  },
  plugins: [require("@tailwindcss/forms")],
}