/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#21C673',
        'green-glow': 'rgba(33, 198, 115, 0.3)',
        'terminal-green': '#00ff41',
      },
      fontFamily: {
        mono: ['Share Tech Mono', 'VT323', 'Courier New', 'monospace'],
      },
      animation: {
        'pulse-glow': 'pulse-glow 2s ease-in-out infinite alternate',
        'float': 'float 3s ease-in-out infinite',
        'glitch': 'glitch 0.3s ease-in-out',
        'scanline': 'scanline 2s linear infinite',
        'flicker': 'flicker 0.2s ease-in-out infinite alternate',
        'circuit-h': 'circuit-h 12s linear infinite',
        'circuit-h-reverse': 'circuit-h 10s linear infinite reverse',
        'circuit-v': 'circuit-v 13s linear infinite',
        'circuit-v-reverse': 'circuit-v 11s linear infinite reverse',
        'crt-flicker': 'crt-flicker 0.15s infinite alternate',
      },
      keyframes: {
        'pulse-glow': {
          '0%': { 
            boxShadow: '0 0 20px rgba(34, 197, 94, 0.5)',
            transform: 'scale(1)',
          },
          '100%': { 
            boxShadow: '0 0 40px rgba(34, 197, 94, 0.8)',
            transform: 'scale(1.05)',
          },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        glitch: {
          '0%': { transform: 'translate(0)' },
          '20%': { transform: 'translate(-2px, 2px)' },
          '40%': { transform: 'translate(-2px, -2px)' },
          '60%': { transform: 'translate(2px, 2px)' },
          '80%': { transform: 'translate(2px, -2px)' },
          '100%': { transform: 'translate(0)' },
        },
        scanline: {
          '0%': { transform: 'translateY(-100vh)' },
          '100%': { transform: 'translateY(100vh)' },
        },
        flicker: {
          '0%, 100%': { opacity: '0.02' },
          '50%': { opacity: '0.08' },
        },
        'circuit-h': {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(100%)' },
        },
        'circuit-v': {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(100%)' },
        },
        'crt-flicker': {
          '0%': { opacity: '0.95' },
          '10%': { opacity: '0.9' },
          '20%': { opacity: '0.92' },
          '30%': { opacity: '0.9' },
          '40%': { opacity: '0.95' },
          '50%': { opacity: '0.85' },
          '60%': { opacity: '0.92' },
          '70%': { opacity: '0.9' },
          '80%': { opacity: '0.94' },
          '90%': { opacity: '0.92' },
          '100%': { opacity: '0.94' },
        },
      },
      backdropBlur: {
        'xl': '20px',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'crt-pattern': 'linear-gradient(transparent 50%, rgba(0, 255, 65, 0.03) 50%)',
        'grid-pattern': 'linear-gradient(rgba(0, 255, 65, 0.15) 1px, transparent 1px), linear-gradient(90deg, rgba(0, 255, 65, 0.15) 1px, transparent 1px)',
        'grid-pattern-large': 'linear-gradient(rgba(0, 255, 65, 0.2) 1px, transparent 1px), linear-gradient(90deg, rgba(0, 255, 65, 0.2) 1px, transparent 1px)',
        'scanline-pattern': 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0, 255, 65, 0.15) 3px, rgba(0, 255, 65, 0.15) 5px)',
      },
      boxShadow: {
        'glow': '0 0 20px rgba(0, 255, 65, 0.5)',
        'glow-lg': '0 0 40px rgba(0, 255, 65, 0.8)',
        'terminal': '0 0 10px rgba(0, 255, 65, 0.6), 0 0 20px rgba(0, 255, 65, 0.3), inset 0 0 15px rgba(0, 255, 65, 0.5)',
      },
      opacity: {
        '15': '0.15',
      },
    },
  },
  plugins: [],
};