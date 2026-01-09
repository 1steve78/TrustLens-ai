import type { Config } from "tailwindcss"

const config: Config = {
  darkMode: "class",

  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./pages/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],

  safelist: [
    // animations
    "animate-brief-slide",

    // hover & motion
    "hover:scale-105",
    "hover:scale-110",
    "transition-all",
    "transition-transform",
    "duration-200",
    "duration-300",

    // glass / effects
    "glass",
    "glass-footer",
    "glow-blue",

    // scrollbars
    "dark-scrollbar",
    "scrollbar-hide",
  ],

  theme: {
    extend: {
      animation: {
        "brief-slide": "briefSlide 0.6s ease-out forwards",
      },
    },
  },

  plugins: [
    // Disabled tw-animate-css plugin because its package has no valid ESM/CJS export for Next 16/Tailwind runtime.
    // If you re-enable it, ensure the package supports Node exports or replace it with a compatible animation plugin.
  ],
}

export default config
