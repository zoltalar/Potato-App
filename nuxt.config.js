const axios = require('axios')
const _ = require('lodash')

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
    '@nuxtjs/redirect-module',
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
    baseUrl: process.env.NUXT_ENV_BASE_URL,
    detectBrowserLanguage: false,
    strategy: 'prefix_except_default',
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

  redirect: [
    { from: '/pl/kontakt', to: '/kontakt', statusCode: 301 },
    { from: '/pl/logowanie', to: '/logowanie', statusCode: 301 },
    { from: '/pl/produkty', to: '/produkty', statusCode: 301 },
    { from: '/pl/rejestracja', to: '/rejestracja', statusCode: 301 },
    { from: '/pl/agromarkety/utworz', to: '/agromarkety/utworz', statusCode: 301 },
    { from: '/pl/gospodarstwa-rolne/utworz', to: '/gospodarstwa-rolne/utworz', statusCode: 301 },
    { from: '/pl/miasta/gdansk/1640', to: '/miasta/gdansk/1640', statusCode: 301 },
    { from: '/pl/miasta/szczecin/2304', to: '/miasta/szczecin/2304', statusCode: 301 },
    { from: '/pl/miasta/warszawa/1090', to: '/miasta/warszawa/1090', statusCode: 301 },
    { from: '/pl/produkty/czeresnie/8', to: '/produkty/czeresnie/8', statusCode: 301 },
    { from: '/pl/produkty/czerwona-kapusta/39', to: '/produkty/czerwona-kapusta/39', statusCode: 301 },
    { from: '/pl/produkty/fasola/32', to: '/produkty/fasola/32', statusCode: 301 },
    { from: '/pl/produkty/groszek-cukrowy/77', to: '/produkty/groszek-cukrowy/77', statusCode: 301 },
    { from: '/pl/produkty/imbir/51', to: '/produkty/imbir/51', statusCode: 301 },
    { from: '/pl/produkty/kasztany/91', to: '/produkty/kasztany/91', statusCode: 301 },
    { from: '/pl/produkty/miod-lipowy/108', to: '/produkty/miod-lipowy/108', statusCode: 301 },
    { from: '/pl/produkty/proso/115', to: '/produkty/proso/115', statusCode: 301 },
    { from: '/pl/produkty/szpinak/76', to: '/produkty/szpinak/76', statusCode: 301 },
    { from: '/pl/produkty/zielony-groszek/64', to: '/produkty/zielony-groszek/64', statusCode: 301 },
    { from: '/pl/produkty/zielona-papryka/65', to: '/produkty/zielona-papryka/65', statusCode: 301 },
  ],

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
      changefreq: 'weekly',
      priority: 0.5,
      lastmod: new Date(),
    },
    sitemaps: [
      {
        path: '/sitemap.xml'
      },
      {
        path: '/city-sitemap.xml',
        exclude: ['/**'],
        routes: async () => {
          const response = await axios.get(process.env.NUXT_ENV_API_BASE_URL + '/api/potato/cities/index', {
            params: { population: 200000, limit: 25 }
          })
          return response.data.data.map((city) => '/miasta/' + _.kebabCase(city.name_ascii) + '/' + city.id)
        }
      },
      {
        path: '/product-sitemap.xml',
        exclude: ['/**'],
        routes: async () => {
          const response = await axios.get(process.env.NUXT_ENV_API_BASE_URL + '/api/potato/inventory/index', {
            params: { limit: 200 }
          })
          return response.data.data.map((inventory) => {
            if (inventory.translations[0]) {
              return '/produkty/' + _.kebabCase(inventory.translations[0].name) + '/' + inventory.id
            }
            return '/en/products/' + _.kebabCase(inventory.name) + '/' + inventory.id
          })
        }    
      }
    ]    
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: { transpile: [/^vue2-google-maps($|\/)/], }
}
