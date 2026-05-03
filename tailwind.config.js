/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#1E5AA8',
          50: '#EBF1FA',
          100: '#D6E2F5',
          200: '#ADC5EB',
          300: '#85A8E1',
          400: '#5C8BD7',
          500: '#1E5AA8',
          600: '#1A4A8A',
          700: '#163A6C',
          800: '#122A4E',
          900: '#0E1A30',
        },
        accent: {
          DEFAULT: '#FF6B35',
          50: '#FFF5F2',
          100: '#FFE8E1',
          200: '#FFD1C3',
          300: '#FFBAA5',
          400: '#FF9E82',
          500: '#FF6B35',
          600: '#E55A28',
          700: '#B8491C',
          800: '#8A3810',
          900: '#5C270A',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
