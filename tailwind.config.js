/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        'void': '#050508',
        'deep': '#0a0b10',
        'glass': 'rgba(255, 255, 255, 0.1)',
        'tech-cyan': '#00d4c8',
        'tech-blue': '#0088ff',
        'tech-purple': '#8844ff',
        'tech-green': '#00cc88',
      },
      backdropBlur: {
        'ios': '40px',
      }
    },
  },
  plugins: [],
}
