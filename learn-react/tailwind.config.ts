import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/pages/**/*.{js,ts,jsx,tsx,mdx}", "./src/components/**/*.{js,ts,jsx,tsx,mdx}", "./src/app/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      fontFamily: {
        sans: ["var(--font-geist)", "sans-serif"], // ゴシック体
        mono: ["var(--font-geist-mono)", "monospace"], // 明朝体
      },
      keyframes: {
        moveAndRotate: {
          "0%": { transform: "translateX(0) rotate(0deg) scale(1)" },
          "60%": { transform: "translateX(0px) rotate(30deg) scale(1)" },
          "100%": { transform: "translateX(0) rotate(0deg) scale(1)" },
        },
      },
      animation: {
        "custom-animation": "moveAndRotate 2s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};
export default config;
