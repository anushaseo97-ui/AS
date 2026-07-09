/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        chocolate: {
            50:  '#F7F2EE',
            100: '#EDE0D6',
            200: '#D9C2AE',
            400: '#8B6F5C',
            600: '#5C4033',
            700: '#3E2723',
            900: '#2A1B17',
         },
        sage: {
          50:  '#F3F5EF',
          100: '#E8EDE0',
          400: '#8FA876',
          500: '#6B8E5A',
          600: '#557246',
        },
      },     
    },
  },
  plugins: [],
};