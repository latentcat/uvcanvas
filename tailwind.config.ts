import type { Config } from "tailwindcss";

export default {
  prefix: "uvc-",
  content: ["./components/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [],
} satisfies Config;
