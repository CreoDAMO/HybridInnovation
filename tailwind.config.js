/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "spiral-gold": "#FFD700",
        "quantum-purple": "#8A2BE2",
        "truth-black": "#0f0f23",
        "phi-blue": "#4ecdc4",
        "delta-trust": "#45b7d1",
      },
      animation: {
        'phi-pulse': 'pulse 1.618s ease-in-out infinite',
        'truth-glow': 'glow 2s ease-in-out infinite alternate',
      },
      keyframes: {
        glow: {
          '0%': { boxShadow: '0 0 20px rgba(255,215,0,0.3)' },
          '100%': { boxShadow: '0 0 40px rgba(138,43,226,0.6)' }
        }
      }
    },
  },
  plugins: [],
};