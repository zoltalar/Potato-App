export default {
  // Disable server-side rendering: https://go.nuxtjs.dev/ssr-mode
  ssr: false,

  // Target: https://go.nuxtjs.dev/config-target
  target: 'static',

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'potato-app',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    '@/assets/scss/app.scss'
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    '~/plugins/bootstrap.js',
    '~/plugins/lodash.js',
    '~/plugins/mixins.js'
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    'bootstrap-vue/nuxt',
    '@nuxtjs/axios',
    '@nuxtjs/fontawesome',
    '@nuxtjs/i18n',
    'nuxt-vue-select'
  ],

  axios: {
    baseUrl: 'http://potato-api.local'
  },

  bootstrapVue: {
    bootstrapCSS: false,
    icons: false,
  },

  fontawesome: {
    icons: {
      solid: true,
      regular: true
    }
  },

  i18n: {
    detectBrowserLanguage: {
      useCookie: false
    },
    strategy: 'prefix',
    locales: [
      {
        code: 'en',
        name: 'English',
        file: 'en-us.js'
      },
      {
        code: 'pl',
        name: 'Polski',
        file: 'pl.js'
      }
    ],
    lazy: true,
    langDir: 'lang/',
    defaultLocale: 'pl'
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {}
}
