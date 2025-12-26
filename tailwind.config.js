/** @type {import('tailwindcss').Config} */
module.exports = {
    // NOTE: Configure the content for all your files
    content: [
        "./app/**/*.{js,jsx,ts,tsx}",
        "./components/**/*.{js,jsx,ts,tsx}",
        "./src/**/*.{js,jsx,ts,tsx}"
    ],
    presets: [require("nativewind/preset")],
    theme: {
        extend: {
            fontFamily: {
                // Cairo support likely requires importing the font in _layout.tsx
                sans: ['System', 'sans-serif'],
            },
            colors: {
                primary: {
                    50: '#f0f9ff',
                    100: '#e0f2fe',
                    200: '#bae6fd',
                    300: '#7dd3fc',
                    400: '#38bdf8',
                    500: '#0ea5e9',
                    600: '#0284c7',
                    700: '#0369a1',
                    800: '#075985',
                    900: '#0c4a6e',
                },
                brand: {
                    blue: '#2563eb',
                    purple: '#7c3aed',
                }
            },
        },
    },
    plugins: [],
}
