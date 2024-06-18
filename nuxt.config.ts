// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: ['@nuxtjs/supabase', '@nuxt/image', '@nuxtjs/google-fonts', '@nuxtjs/sitemap'],
  devtools: { enabled: true },
  css: ['~/app.css'],
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
  supabase: {
    redirect: false,
  },
  image: {
    format: ['webp', 'avif'],
  },
  googleFonts: {
    families: {
      Karla: true,
    },
    download: true,
  },
  site: {
    url: 'https://remind5.com',
  },
  routeRules: {
    '/dashboard/**': {
      robots: false,
    },
  },
  runtimeConfig: {
    public: {
      posthogPublicKey: '',
      posthogHost: '',
    },
  },
})
