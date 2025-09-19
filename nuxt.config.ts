export default defineNuxtConfig({
  modules: [
    '@nuxt/content',
    '@nuxtjs/tailwindcss'
  ],

  css: ['~/assets/css/main.css'],

  content: {
    highlight: {
      theme: 'github-dark',
      preload: ['json', 'js', 'ts', 'html', 'css', 'vue', 'shell']
    },
    navigation: {
      fields: ['title', 'description']
    }
  },

  nitro: {
    // prerender: {
    //   routes: ['/sitemap.xml']
    // }
  },

  routeRules: {
    // Serve R1 apps statically
    '/apps/reaction-timer/**': { prerender: true },
    '/apps/r1-reaction-timer-game/**': { prerender: true },
    '/apps/plugin-demo/**': { prerender: true },
    '/apps/qr-demo/**': { prerender: true },
  },

  app: {
    head: {
      title: 'Rabbit R1 Creations SDK',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'description', content: 'Build amazing apps for the Rabbit R1 device with our comprehensive SDK and documentation.' }
      ],
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
      ]
    }
  }
})
