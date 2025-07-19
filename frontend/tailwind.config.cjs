module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx,html}"],
  theme: {
    extend: {
      colors: {
        background: "var(--color-background)",
        foreground: "var(--color-foreground)",
        primary: "var(--color-primary)",
        border: "var(--color-border)",
      },
    },
  },
  plugins: [
    require("tailwindcss-animate"),
  ],
  darkMode: 'class',
};
