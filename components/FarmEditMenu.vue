<template>
  <b-list-group>
    <nuxt-link :to="tab.href" class="list-group-item list-group-item-action" v-for="(tab, i) in tabs()" :key="'farm-edit-tab-' + i">{{ tab.title }}</nuxt-link>
  </b-list-group>
</template>
<script>
export default{
  name: 'FarmEditMenu',
  methods: {
    tabs () {
      const tabs = []
      const editTabs = this.farmEditTabs()
      this.$_.forEach(editTabs, (struct) => {
        tabs.push({
          href: this.localePath({
            name: 'farms-edit-id-tab',
            params: {
              id: this.$route.params.id,
              tab: this.localeFarmEditTab(struct.tab)
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
