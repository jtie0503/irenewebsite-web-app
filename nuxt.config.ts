export default defineNuxtConfig({

  compatibilityDate: "2025-07-15",

  devtools: {
    enabled: true,
  },

  routeRules: {

    "/api/dog/**": {
      proxy: `${process.env.API_CORE}/api/dog/**`
    },

    "/api/upload/**": {
      proxy: `${process.env.API_CORE}/api/upload/**`
    },
        "/api/order/**": {
      proxy: `${process.env.API_CORE}/api/order/**`
    },

     "/api/auth/**": {
      proxy: `${process.env.API_CORE}/api/auth/**`
    },

  },

  modules: ["vuetify-nuxt-module"]

})