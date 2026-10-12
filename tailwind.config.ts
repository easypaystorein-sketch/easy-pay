import type { Config } from "tailwindcss";
const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: { extend: { colors: { navy: "#071a2b", gold: "#d6ad55", mist: "#eff4f8" }, boxShadow: { glass: "0 20px 70px rgba(0,0,0,.18)" } } },
  plugins: []
};
export default config;
