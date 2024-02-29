import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./src/pages/**/*.{js,ts,jsx,tsx,mdx}', './src/components/**/*.{js,ts,jsx,tsx,mdx}', './src/app/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      colors: {
        'wl-cyan': '#00A7E5',
        'wl-cyan-2': '#ADC6DA',
        'wl-cyan-3': '#E0EAF8',
        'wl-blue': '#111823',
        'wl-blue-2': '#203449',
        'wl-blue-3': '#4D5D6D',
        'wl-light-blue': '#3B72A4',
        'wl-light-blue-2': '#4E90B9',
        'wl-light-blue-3': '#C7D4E5',
        'wl-gray': '#222529',
        'wl-gray-2': '#4E5154',
        'wl-gray-3': '#D3D3D4',
        'wl-red': '#E93D44',
        'wl-red-2': '#AF2E33',
        'wl-red-3': '#751F22',
      },
      fontFamily: {
        sans: ['var(--font-nunito_sans)', 'font-nunito_sans'],
      },
      ringWidth: {
        2: '0px',
      },
    },
  },
  // plugins: [require('@tailwindcss/forms')],
};
export default config;
