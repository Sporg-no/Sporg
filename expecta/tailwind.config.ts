import type { Config } from 'tailwindcss'

const config: Config = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        expecta: {
          bg: '#FAF7F4',
          'bg-2': '#F3EEE9',
          plum: '#4A2545',
          'plum-dark': '#3a1c37',
          ink: '#3a2136',
          peach: '#F4C7B0',
          green: '#2E7D5B',
          amber: '#C98A00',
          red: '#B4453A',
        },
      },
    },
  },
  plugins: [],
}

export default config
