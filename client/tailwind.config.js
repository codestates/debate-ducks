module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  darkMode: false,
  theme: {
    extend: {
      spacing: {
        // padding, margin, width, height
        18: "1.125rem",
        20: "1.25rem",
        24: "1.5rem",
        30: "1.875rem",
        32: "2rem",
        36: "2.25rem",
        40: "2.5rem",
        48: "3rem",
        60: "3.75rem",
        70: "4.375rem",
        80: "5rem",
        90: "5.625rem",
        112: "7rem",
        274: "17.125rem",
        370: "23.125rem",
        410: "25.625rem",
      },
      borderRadius: {
        12: "0.75rem",
        16: "1rem",
        18: "1.125rem",
        20: "1.25rem",
        30: "1.875rem",
        35: "2.188rem",
      },
      fontFamily: {
        poppins: '"Poppins"',
      },
      fontSize: {
        12: "0.75rem",
        14: "0.875rem",
        18: "1.125rem",
        24: "1.5rem",
        36: "2.25rem",
        48: "3rem",
      },
      colors: {
        ducks: {
          blue: { "6667ab": "#6667ab" },
          green: { cce8cc: "#cce8cc" },
          straw: { e5e366: "#e5e366" },
          yellow: { fedd00: "#fedd00" },
          orange: { ff9425: "#ff9425" },
          gray: {
            eee: "#eeeeee",
            ccc: "#cccccc",
            666: "#666666",
          },
          black: "#000000",
        },
      },
    },
  },
  plugins: [require("@tailwindcss/forms")],
};
