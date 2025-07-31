// tailwind.config.mjs (ESM 正確寫法)
const config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    // './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './styles/**/*.{css,scss}',
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}

export default config