/** @type {import('tailwindcss').Config} */
// PASALPINTAR "investigation room" palette.
// Dark warm room + cork board + aged evidence paper. Contrast pairs used in the
// UI were checked against WCAG AA (see Stage B report).
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Barlow', 'system-ui', 'sans-serif'],
        display: ['"Barlow Condensed"', 'Barlow', 'system-ui', 'sans-serif'],
        hand: ['Kalam', 'cursive'],
      },
      colors: {
        // Room / chrome (replaces the old navy-primary / navy-secondary)
        soot: {
          DEFAULT: '#1C1814',
          raised: '#2A231C',
          line: '#3D3329',
        },
        cork: {
          DEFAULT: '#7A5C3E',
          dark: '#4E3A27',
        },
        // Evidence paper (replaces ui-lightBg)
        paper: {
          DEFAULT: '#E8DCC2',
          deep: '#DDCDAA',
        },
        ink: '#241E18',
        // Pushpin brass — main accent on dark surfaces (replaces accent-blue)
        brass: {
          DEFAULT: '#D9A441',
          light: '#E6B95E',
          deep: '#7A5212', // for text on paper
        },
        // Red string & rubber stamps
        crimson: '#A8232D',
        sticky: '#E9CF6B',
        status: {
          success: '#6FB383',
          warning: '#E8964A',
          danger: '#E0675F',
        },
      },
      boxShadow: {
        pinned: '0 1px 1px rgba(0,0,0,.35), 0 10px 18px -6px rgba(0,0,0,.6)',
        lifted: '0 2px 2px rgba(0,0,0,.3), 0 22px 30px -10px rgba(0,0,0,.7)',
      },
    },
  },
  plugins: [],
}
