<template>
  <b-list-group>
    <nuxt-link :to="tab.href" class="list-group-item list-group-item-action" v-for="(tab, i) in tabs()" :key="'event-edit-tab-' + i">{{ tab.title }}</nuxt-link>
    <nuxt-link to="/" class="list-group-item list-group-item-action">{{ $t('phrases.view') }}</nuxt-link>
  </b-list-group>
</template>
<script>
export default{
  name: 'EventEditMenu',
  methods: {
    tabs () {
      const tabs = []
      const editTabs = this.eventEditTabs()
      this.$_.forEach(editTabs, (struct) => {
        tabs.push({
          href: this.localePath({
            name: 'events-edit-tab-id',
            params: {
              tab: this.localeEventEditTab(struct.tab),
              id: this.$route.params.id
            }
          }),
          title: this.$t('phrases.' + this.$_.snakeCase(struct.tab))
        })
      })
      return tabs
    }
  }
}
</script>
