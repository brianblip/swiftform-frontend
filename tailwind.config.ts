import type { Config } from "tailwindcss";

const config: Config = {
    content: [
        "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            backgroundImage: {
                "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
                "gradient-conic":
                    "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
            },
            colors: {
                primary: {
                    black: "#000000",
                    neutral: "#343541",
                    white: "#ECECF1",
                    secondary: "#444654",
                },
                zinc: {
                    100: "#f4f4f5",
                    200: "#e4e4e7",
                    300: "#d4d4d8",
                    500: "#71717a",
                    800: "#27272a",
                },
                error: "#ef4444",
            },
            animation: {
                loading: "loading 2s ease-in-out infinite",
            },
            keyframes: {
                loading: {
                    "0%": { transform: "rotate(0deg)" },
                    "25%": { transform: "rotate(180deg)" },
                    "50%": { transform: "rotate(181deg)" },
                    "75%": { transform: "rotate(359deg)" },
                    "100%": { transform: "rotate(360deg)" },
                },
            },
        },
    },
    plugins: [],
};
export default config;
