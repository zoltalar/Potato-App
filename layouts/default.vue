<template>
  <div>
    <the-header />
    <nuxt />
    <the-footer />
  </div>
</template>
<script>
export default {
  name: 'LayoutDefault',
  middleware: ['sync'],
  head () {
    return {
      titleTemplate: '%s - ' + this.$t('messages.codename'),
      htmlAttrs: {
        lang: this.$i18n.locale,
      }
    }
  }
}
</script>
