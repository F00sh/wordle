import type { Config } from 'tailwindcss'

export default <Partial<Config>>{
  content: [
    './components/**/*.{vue,js,ts}',
    './composables/**/*.{js,ts}',
    './layouts/**/*.{vue,js,ts}',
    './pages/**/*.{vue,js,ts}',
    './plugins/**/*.{js,ts}',
    './app.vue',
  ],
  theme: {
    extend: {
      colors: {
        board: '#111827', // gray-900
        tile: '#1f2937',  // gray-800
        absent: '#374151', // gray-700
        present: '#eab308', // yellow-500
        correct: '#22c55e', // green-500
      }
    },
  },
}

