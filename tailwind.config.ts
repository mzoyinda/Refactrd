// import type { Config } from "tailwindcss";

// const config: Config = {
//   content: [
//     "./pages/**/*.{js,ts,jsx,tsx,mdx}",
//     "./components/**/*.{js,ts,jsx,tsx,mdx}",
//     "./app/**/*.{js,ts,jsx,tsx,mdx}",
//   ],
//   theme: {
//     extend: {
//       colors: {
//         primary: {
//           DEFAULT: "#A2D2FF",
//           light: "#C5E3FF",
//           dark: "#7FBFFF",
//         },
//         secondary: {
//           DEFAULT: "#1F2A44",
//           light: "#2D3A5C",
//           dark: "#151D31",
//         },
//         tertiary: {
//           DEFAULT: "#E6EAF0",
//           light: "#F5F7FA",
//           dark: "#D1D7E0",
//         },
//         accent: {
//           DEFAULT: "#5B6CFF",
//           light: "#7C8AFF",
//           dark: "#4352D9",
//         },
//       },
//       fontFamily: {
//         jakarta: ["var(--font-jakarta)", "system-ui", "sans-serif"],
//         clash: ["var(--font-clash)", "system-ui", "sans-serif"],
//         montserrat: ["var(--font-montserrat)", "system-ui", "sans-serif"],
//       },
//       animation: {
//         "fade-in": "fadeIn 0.6s ease-out",
//         "fade-up": "fadeUp 0.8s ease-out",
//         "slide-in": "slideIn 0.6s ease-out",
//         "scale-in": "scaleIn 0.5s ease-out",
//       },
//       backdropBlur: {
//         xs: "2px",
//       },
//       transitionDelay: {
//         "0": "0ms",
//         "200": "200ms",
//         "300": "300ms",
//         "400": "400ms",
//         "500": "500ms",
//         "700": "700ms",
//         "1000": "1000ms",
//       },
//       keyframes: {
//         fadeIn: {
//           "0%": { opacity: "0" },
//           "100%": { opacity: "1" },
//         },
//         fadeUp: {
//           "0%": { opacity: "0", transform: "translateY(20px)" },
//           "100%": { opacity: "1", transform: "translateY(0)" },
//         },
//         slideIn: {
//           "0%": { transform: "translateX(-20px)", opacity: "0" },
//           "100%": { transform: "translateX(0)", opacity: "1" },
//         },
//         scaleIn: {
//           "0%": { transform: "scale(0.95)", opacity: "0" },
//           "100%": { transform: "scale(1)", opacity: "1" },
//         },
//       },
//     },
//   },
//   plugins: [],
// };

// export default config;

import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#A2D2FF",
          light: "#C5E3FF",
          dark: "#7FBFFF",
        },
        secondary: {
          DEFAULT: "#1F2A44",
          light: "#2D3A5C",
          dark: "#151D31",
        },
        tertiary: {
          DEFAULT: "#E6EAF0",
          light: "#F5F7FA",
          dark: "#D1D7E0",
        },
        accent: {
          DEFAULT: "#5B6CFF",
          light: "#7C8AFF",
          dark: "#4352D9",
        },
      },
      fontFamily: {
        jakarta: ["var(--font-jakarta)", "system-ui", "sans-serif"],
        clash: ["var(--font-clash)", "system-ui", "sans-serif"],
        montserrat: ["var(--font-montserrat)", "system-ui", "sans-serif"],
      },
      animation: {
        "fade-in": "fadeIn 0.6s ease-out",
        "fade-up": "fadeUp 0.8s ease-out",
        "slide-in": "slideIn 0.6s ease-out",
        "scale-in": "scaleIn 0.5s ease-out",
        "slide-in-right": "slideInRight 0.3s ease-out",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        fadeUp: {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        slideIn: {
          "0%": { transform: "translateX(-20px)", opacity: "0" },
          "100%": { transform: "translateX(0)", opacity: "1" },
        },
        scaleIn: {
          "0%": { transform: "scale(0.95)", opacity: "0" },
          "100%": { transform: "scale(1)", opacity: "1" },
        },
        slideInRight: {
          "0%": { transform: "translateX(100%)" },
          "100%": { transform: "translateX(0)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
