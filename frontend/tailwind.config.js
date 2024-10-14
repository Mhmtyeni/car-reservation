/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {},
      colors: {
        darkColor: "#1A202C",
        darkGrayColor: "#434343",
        grayColor: "#a2aebb",
        redColor: "#C23031",
        blueColor: "#03b5aa ",
        yellowColor: "#FFBA08",
        whiteColor: "#f4f7f5",
        greenColor: "#20BF55",
      },
      fontFamily: {
        textTextType: ["Poppins", "sans-serif"],
        titleTextType: ["Audiowide", "sans-serif"],
      },
      container: {
        screens: {
          xs: "360px",
          sm: "600px",
          md: "750px",
          lg: "1024px",
          xl: "1140px",
          "2xl": "1440px",
        },
      },
      animation: {
        scroll:
          "scroll var(--animation-duration, 40s) var(--animation-direction, forwards) linear infinite",
      },
      keyframes: {
        scroll: {
          to: {
            transform: "translate(calc(-50% - 0.5rem))",
          },
        },
      },
    },
  },
  plugins: [],
};
