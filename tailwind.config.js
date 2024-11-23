/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [
    require('daisyui'),
  ],
  daisyui: {
    themes: [
      // Anda tetap bisa menambahkan tema gelap jika perlu
      'cupcake',
     'dark',
     'light',
    ],
  },
}
