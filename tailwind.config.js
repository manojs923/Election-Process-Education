/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        navy: '#0D1B3E',
        saffron: '#FF9933',
        indiaGreen: '#138808',
        offwhite: '#F5F0E8',
      },
      boxShadow: {
        glow: '0 24px 80px rgba(13, 27, 62, 0.16)',
        neon: '0 0 0 1px rgba(255,255,255,0.06), 0 18px 50px rgba(255,153,51,0.18)',
      },
      fontFamily: {
        display: ['"Playfair Display"', 'serif'],
        body: ['"DM Sans"', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
