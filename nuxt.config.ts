// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: [
    '@nuxtjs/tailwindcss',
  ],
  css: ['@/assets/css/tailwind.css'],
  app: {
    head: {
      title: 'Wordle - Nuxt + Tailwind',
      meta: [
        { name: 'viewport', content: 'width=device-width, initial-scale=1, maximum-scale=1' },
        { name: 'theme-color', content: '#111827' }
      ]
    }
  },
  future: {
    // keep forward-compatible with Nuxt 4
    compatibilityVersion: 4
  }
})

