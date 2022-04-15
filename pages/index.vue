<template>
  <background>
    <the-header />
    <site-search />
  </background>
</template>
<script>
export default {
  name: 'PageIndex',
  mounted() {
    this.loadResources()
  }
}
</script>
