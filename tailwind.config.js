/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      animation: {
        "marquee": "marquee 15s linear infinite",
        "fade-in": "fadeIn 0.6s ease-out",
        "fade-in-up": "fadeInUp 0.9s ease-out both",
        "fade-in-left": "fadeInLeft 0.9s ease-out both",
        "fade-in-right": "fadeInRight 0.9s ease-out both",
        "gradient-x": "gradientX 3s ease infinite",
      },
      keyframes: {
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-100%)" },
        },
        fadeIn: {
          "from": { opacity: "0" },
          "to": { opacity: "1" },
        },
        fadeInUp: {
          "from": {
            opacity: "0",
            transform: "translateY(24px)",
          },
          "to": {
            opacity: "1",
            transform: "translateY(0)",
          },
        },
        fadeInLeft: {
          "from": {
            opacity: "0",
            transform: "translateX(-40px)",
          },
          "to": {
            opacity: "1",
            transform: "translateX(0)",
          },
        },
        fadeInRight: {
          "from": {
            opacity: "0",
            transform: "translateX(40px)",
          },
          "to": {
            opacity: "1",
            transform: "translateX(0)",
          },
        },
        gradientX: {
          "0%, 100%": {
            backgroundPosition: "left center",
          },
          "50%": {
            backgroundPosition: "right center",
          },
        },
      },
    },
  },
  plugins: [],
}

