<template>
  <div>
    <background>
      <the-header />
      <site-search />
    </background>
    <nuxt />
    <the-footer />
  </div>
</template>
<script>
export default {
  name: 'LayoutHome',
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
