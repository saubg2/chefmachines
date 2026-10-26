/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          orange: '#FF5722',       // Primary vibrant culinary flame
          'orange-hover': '#F4511E',
          saffron: '#FF9800',      // Energetic saffron gold
          amber: '#FFB300',
          dark: '#0B0F17',         // Deep carbon slate
          navy: '#111827',         // Rich background
          surface: '#182232',      // Card surface
          card: '#1F2C3F',         // Elevated card
          border: '#2D3D52',       // Refined border
          muted: '#94A3B8',
          teal: '#00B4D8',         // Cold/refrigeration accent
          mint: '#10B981',         // High efficiency green
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
        display: ['"Barlow Condensed"', 'Barlow', 'sans-serif'],
        industrial: ['Barlow', 'Inter', 'sans-serif']
      },
      boxShadow: {
        'glow-orange': '0 0 25px -5px rgba(255, 87, 34, 0.4)',
        'glow-teal': '0 0 25px -5px rgba(0, 180, 216, 0.35)',
        'card-lift': '0 10px 30px -10px rgba(0, 0, 0, 0.5)'
      }
    },
  },
  plugins: [],
}
