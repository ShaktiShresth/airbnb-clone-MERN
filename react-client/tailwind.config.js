/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primaryColor: "#f5385d",
        primaryHoverColor: "#ed4768",
        grayColor: "#C5C5C5",
        greenColor: "#097969",
      },
      height: {
        onePxHeight: "1px",
        placePicHeight: "600px",
      },
    },
  },
  plugins: [],
};
