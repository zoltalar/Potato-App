<template>
  <div>
    Home
  </div>
</template>
<script>
export default {
  name: 'PageIndex',
  layout: 'home',
  head () {
    return {
      title: this.$t('messages.search_food'),
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: this.$t('messages.meta_description_index')
        }
      ],
    }
  },
}
</script>
