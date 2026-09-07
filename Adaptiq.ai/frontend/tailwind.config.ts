import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        ink: "#0F172A",
        primary: "#4F46E5",
        accent: "#7C3AED",
        canvas: "#F8FAFC",
      },
      fontFamily: {
        sans: ["var(--font-plus-jakarta)", "ui-sans-serif", "sans-serif"],
        display: ["var(--font-space-grotesk)", "ui-sans-serif", "sans-serif"],
      },
      boxShadow: {
        soft: "0 18px 50px rgba(15, 23, 42, 0.08)",
        glow: "0 12px 32px rgba(79, 70, 229, 0.2)",
      },
    },
  },
  plugins: [],
};

export default config;
