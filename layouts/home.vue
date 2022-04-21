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
  mounted() {
    this.loadResources()
  }
}
</script>
