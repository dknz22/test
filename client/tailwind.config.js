/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{vue,js}"],
  theme: {
    extend: {
      colors: {
        brand: { 400: "#818cf8", 500: "#6366f1", 600: "#4f46e5", 700: "#4338ca" },
        accent: { 400: "#fb7a5c", 500: "#f4603e", 600: "#e84e2c" },
        ink: { 900: "#0b1220", 800: "#0f1829", 700: "#15203a" },
      },

      keyframes: {
        "fade-up": { "0%": { opacity: "0", transform: "translateY(16px)" }, "100%": { opacity: "1", transform: "translateY(0)" } },
        "spin-slow": { "0%": { transform: "rotate(0deg)" }, "100%": { transform: "rotate(360deg)" } },
        "pulse-ring": { "0%, 100%": { opacity: "0.5", transform: "scale(1)" }, "50%": { opacity: "1", transform: "scale(1.04)" } },
      },
      animation: {
        "fade-up": "fade-up 0.6s ease-out both",
        "spin-slow": "spin-slow 28s linear infinite",
        "pulse-ring": "pulse-ring 6s ease-in-out infinite"
      },
    },
  },
  plugins: [],
}

