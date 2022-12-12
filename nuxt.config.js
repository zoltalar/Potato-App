export default {
  // Disable server-side rendering: https://go.nuxtjs.dev/ssr-mode
  ssr: true,

  // Target: https://go.nuxtjs.dev/config-target
  target: 'server',

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { name: 'format-detection', content: 'telephone=no' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Open+Sans:ital,wght@0,300;0,400;0,600;1,300;1,400;1,600&display=swap' },
      { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500;1,600;1,700&family=Open+Sans:ital,wght@0,300;0,400;0,600;1,300;1,400;1,600&display=swap' }
    ],
    script: [
      {
        src: 'https://www.googletagmanager.com/gtag/js?id=' + process.env.NUXT_ENV_GOOGLE_ANALYTICS_PROPERTY_ID,
        async: true
      },
      {
        src: 'ga.js'
      }
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    '@/assets/scss/app.scss'
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    { src: '~/plugins/axios.js' },
    { src: '~/plugins/bootstrap.js', mode: 'client' },
    { src: '~/plugins/chart.js', mode: 'client' },
    { src: '~/plugins/lodash.js' },
    { src: '~/plugins/maps.js' },
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
    '@nuxtjs/pwa',
    '@nuxtjs/robots',
    '@nuxtjs/sitemap',
    'nuxt-vue-select'
  ],

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
      login: 'login',
      logout: '/',
      home: false
    },
    plugins: [ '~/plugins/auth.js' ]
  },

  axios: {
    baseUrl: process.env.NUXT_ENV_API_BASE_URL
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
    lazy: false,
    langDir: 'lang/',
    defaultLocale: 'pl'
  },

  pwa: {
    meta: {
      name: 'Ziemniaczek.eu',
      author: 'Ziemniaczek Team'
    },
    manifest: {
      name: 'Ziemniaczek.eu',
      short_name: 'Ziemniaczek'
    }
  },

  robots: [
    {
      UserAgent: '*',
      Allow: '/',
    },
    {
      Sitemap: process.env.NUXT_ENV_BASE_URL + '/sitemap.xml'
    }
  ],

  sitemap: {
    gzip: false,
    trailingSlash: false,
    defaults: {
      changefreq: 'monthly',
      priority: 0.5,
      lastmod: new Date(),
    },
    routes: [
      {
        url: '/',
        changefreq: 'daily',
        priority: 1,
        lastmod: new Date(),
      },
    ],
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: { transpile: [/^vue2-google-maps($|\/)/], }
}
