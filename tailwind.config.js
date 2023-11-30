/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx,vue}",
  ],
  theme: {
    extend: {
      transitionDuration: {
        '2000': '2000ms',
        '3000': '3000ms',
        '4000': '4000ms',
      },
      width: {
        '150-px': '150px',
        '75-px': '75px',
      },
      maxWidth: {
        '1500-px': '1500px',
      },
      height: {
        '150-px': '150px',
        '75-px': '75px',
      },
      borderWidth: {
        '6': '6px',
        '20': '20px',
      },
      colors: {
        'main': 'var(--main-color)',
        'blue': 'var(--accent-color)',
        'positive': 'var(--positive)',
        'negative': 'var(--negative)',
      },
    }
  },
  plugins: [],
}