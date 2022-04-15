<template>
  <div>
    <the-header />
  </div>
</template>
<script>
export default {
  name: 'PageRegister',
  nuxtI18n: {
    locales: ['en', 'pl'],
    paths: {
      en: '/register',
      pl: '/rejestracja'
    }
  }
}
</script>
