<template>
  <section class="site-search">
    <b-container>
      <h1>{{ $t('messages.search_food') }}</h1>
      <site-search-form />
    </b-container>
  </section>
</template>
<script>
export default {
  name: 'SiteSearch'
}
</script>
