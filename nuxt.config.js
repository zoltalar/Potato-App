export default {
  // Disable server-side rendering: https://go.nuxtjs.dev/ssr-mode
  ssr: false,

  // Target: https://go.nuxtjs.dev/config-target
  target: 'static',

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
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
    { src: '~/plugins/axios.js', mode: 'client' },
    { src: '~/plugins/bootstrap.js', mode: 'client' },
    { src: '~/plugins/chart.js', mode: 'client' },
    { src: '~/plugins/lodash.js' },
    { src: '~/plugins/maps.js', mode: 'client' },
    { src: '~/plugins/moment.js', mode: 'client' },
    { src: '~/plugins/mixins.js' }
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    'bootstrap-vue/nuxt',
    '@nuxtjs/axios',
    '@nuxtjs/auth-next',
    '@nuxtjs/fontawesome',
    '@nuxtjs/i18n',
    '@nuxtjs/moment',
    'nuxt-vue-select'
  ],

  router: {
    middleware: ['sync']
  },

  auth: {
    strategies: {
      local: {
        token: {
          property: 'token',
          global: true,
          required: true,
          type: 'Bearer'
        },
        user: {
          property: 'data',
          autoFetch: true
        },
        endpoints: {
          login: {
            url: '/api/potato/authentication/login',
            method: 'post',
            propertyName: 'token'
          },
          user: {
            url: '/api/potato/users/current',
            method: 'get',
            propertyName: 'data'
          },
          logout: {
            url: '/api/potato/authentication/logout',
            method: 'post'
          }
        },
        tokenType: 'Bearer'
      }
    },
    redirect: {
      login: '/login',
      logout: '/',
      home: false
    }
  },

  axios: {
    baseUrl: process.env.API_BASE_URL
  },

  bootstrapVue: {
    bootstrapCSS: false,
    icons: false,
  },

  fontawesome: {
    icons: {
      solid: true,
      regular: true,
      brands: true
    }
  },

  i18n: {
    detectBrowserLanguage: false,
    strategy: 'prefix',
    locales: [
      {
        code: 'pl',
        name: 'Polski',
        file: 'pl.js'
      },
      {
        code: 'en',
        name: 'English',
        file: 'en-us.js'
      }
    ],
    lazy: true,
    langDir: 'lang/',
    defaultLocale: 'pl'
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {},
}
