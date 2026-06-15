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
        // 損保1=ブルー系、損保2=グリーン系で科目を色分け
        sonpo1: {
          DEFAULT: "#2563eb",
          light: "#dbeafe",
        },
        sonpo2: {
          DEFAULT: "#059669",
          light: "#d1fae5",
        },
      },
    },
  },
  plugins: [],
};

export default config;
