import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        mono: ['"Geist Mono"', '"JetBrains Mono"', '"Courier New"', 'monospace'],
        sans: ['Inter', '-apple-system', 'sans-serif'],
      },
      colors: {
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        border: 'hsl(var(--border))',
        ring: 'hsl(var(--ring))',
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      boxShadow: {
        'glow-green': '0 0 20px rgba(0, 255, 0, 0.15)',
        'glow-green-sm': '0 0 10px rgba(0, 255, 0, 0.1)',
        'glow-cyan': '0 0 20px rgba(0, 255, 255, 0.15)',
      },
      keyframes: {
        'glitch-before': {
          '0%, 92%': { opacity: '0' },
          '93%': { opacity: '.8', left: '-2px', top: '-2px' },
          '94%': { opacity: '.8', left: '2px', top: '0' },
          '95%': { opacity: '0' },
          '96%': { opacity: '.8', left: '0', top: '2px' },
          '97%, 100%': { opacity: '0' },
        },
        'glitch-after': {
          '0%, 90%': { opacity: '0' },
          '91%': { opacity: '.8', left: '2px', top: '2px' },
          '92%': { opacity: '.8', left: '-2px', top: '1px' },
          '93%': { opacity: '0' },
          '94%': { opacity: '.8', left: '1px', top: '-2px' },
          '95%, 100%': { opacity: '0' },
        },
        'glow-pulse': {
          '0%, 100%': { boxShadow: '0 0 8px rgba(0, 255, 0, 0.3)' },
          '50%': { boxShadow: '0 0 20px rgba(0, 255, 0, 0.6)' },
        },
        breathe: {
          '0%, 100%': { filter: 'drop-shadow(0 0 8px rgba(0, 255, 0, 0.3))' },
          '50%': { filter: 'drop-shadow(0 0 20px rgba(0, 255, 0, 0.6))' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-6px)' },
        },
        'terminal-scan': {
          '0%': { transform: 'translateY(0)' },
          '100%': { transform: 'translateY(4px)' },
        },
        'caret-blink': {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0' },
        },
        'mesh-shift': {
          '0%, 100%': { transform: 'scale(1) rotate(0deg)' },
          '50%': { transform: 'scale(1.08) rotate(1deg)' },
        },
        'shape-drift': {
          '0%, 100%': { transform: 'translateY(0) rotate(0deg) scale(1)', opacity: '0.5' },
          '25%': { transform: 'translateY(-15px) rotate(90deg) scale(1.1)', opacity: '0.8' },
          '50%': { transform: 'translateY(5px) rotate(180deg) scale(0.9)', opacity: '0.4' },
          '75%': { transform: 'translateY(-8px) rotate(270deg) scale(1.05)', opacity: '0.7' },
        },
      },
      animation: {
        'glitch-before': 'glitch-before 4s 3s infinite',
        'glitch-after': 'glitch-after 4s 3s infinite',
        'glow-pulse': 'glow-pulse 3s ease-in-out infinite',
        breathe: 'breathe 6s ease-in-out infinite',
        float: 'float 4s ease-in-out infinite',
        'terminal-scan': 'terminal-scan 8s linear infinite',
        'caret-blink': 'caret-blink 1.2s step-end infinite',
        'mesh-shift': 'mesh-shift 16s ease-in-out infinite alternate',
        'shape-drift': 'shape-drift 20s ease-in-out infinite',
      },
    },
  },
  plugins: [],
};

export default config;
