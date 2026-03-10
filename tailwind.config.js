// tailwind.config.js
export default {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  theme: {
    extend: {
      colors: {
        saffron: '#FF9933',
        kumkum: '#A1132E',
        peacock: '#1B4D3E',
        sandal: '#C19A6B',
        ivory: '#F8F1E5',
        templegold: '#D4AF37'
      },
      fontFamily: {
        tamil: ['"Noto Serif Tamil"', 'serif'],
        display: ['"Playfair Display"', 'serif'],
        }

    }
  },
  plugins: []
};
