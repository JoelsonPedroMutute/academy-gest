export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',

  devtools: { enabled: true },


  app: {
    head: {
      title: 'Academy Gest',
      meta: [
        { name: 'description', content: 'Academy Gest' },
        { name: 'author', content: 'Hernany Simão' },
      ],
      script: [
        { type: 'text/javascript', src: 'https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js' },
        { type: 'text/javascript', src: 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/js/all.min.js' }
      ]
    }
  },

  css: ['~/assets/sass/main.sass'],

  modules: ["@nuxt/image"],

  runtimeConfig: {
    public: {
      apiBase: process.env.API_BASE,
    },
  },

  vite: {
    server: {
      allowedHosts: ['.ngrok-free.app']
    }
  }
})