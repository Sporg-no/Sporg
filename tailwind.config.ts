import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        sporg: {
          bg:            '#09090b',
          surface:       '#111114',
          'surface-2':   '#1c1c20',
          'surface-3':   '#27272a',
          border:        'rgba(255,255,255,0.07)',
          'border-strong': 'rgba(255,255,255,0.12)',
          text:          '#f4f4f5',
          'text-2':      '#a1a1aa',
          'text-3':      '#71717a',
          accent:        '#4ade80',
          'accent-dim':  '#22c55e',
          'accent-glow': 'rgba(74,222,128,0.15)',
          'accent-2':    '#818cf8',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
      },
      backgroundImage: {
        'hero-mesh':
          'radial-gradient(ellipse 90% 70% at 50% -5%, rgba(74,222,128,0.18) 0%, transparent 65%), ' +
          'radial-gradient(ellipse 60% 50% at 85% 40%, rgba(129,140,248,0.12) 0%, transparent 60%), ' +
          'radial-gradient(ellipse 50% 40% at 10% 60%, rgba(74,222,128,0.06) 0%, transparent 60%)',
        'accent-gradient': 'linear-gradient(135deg, #4ade80 0%, #22d3ee 100%)',
      },
      boxShadow: {
        'glow-green': '0 0 30px rgba(74,222,128,0.2), 0 0 80px rgba(74,222,128,0.08)',
        'glow-sm':    '0 0 12px rgba(74,222,128,0.25)',
        'card':       '0 1px 3px rgba(0,0,0,0.5)',
        'card-hover': '0 8px 32px rgba(0,0,0,0.5)',
        'elevated':   '0 20px 60px rgba(0,0,0,0.6)',
      },
      keyframes: {
        fadeUp: {
          '0%':   { opacity: '0', transform: 'translateY(24px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          '0%':   { opacity: '0' },
          '100%': { opacity: '1' },
        },
      },
      animation: {
        'fade-up': 'fadeUp 0.6s cubic-bezier(0.16,1,0.3,1) forwards',
        'fade-in': 'fadeIn 0.4s ease-out forwards',
      },
    },
  },
  plugins: [],
}

export default config
