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
  mounted() {
    this.loadResources()
  }
}
</script>
