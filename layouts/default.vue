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
  head () {
    return {
      titleTemplate: '%s - ' + this.$t('messages.codename'),
      htmlAttrs: {
        lang: this.$i18n.locale,
      }
    }
  },
  mounted () {
    this.loadResources()
  }
}
</script>
