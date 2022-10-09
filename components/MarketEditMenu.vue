<template>
  <b-list-group>
    <nuxt-link :to="tab.href" class="list-group-item list-group-item-action" v-for="(tab, i) in tabs()" :key="'market-edit-tab-' + i">{{ tab.title }}</nuxt-link>
    <nuxt-link :to="localePath({ name: 'markets-show-name-id', params: { name: slugify(market.name), id: market.id } })" class="list-group-item list-group-item-action">{{ $t('phrases.view') }}</nuxt-link>
  </b-list-group>
</template>
<script>
export default{
  name: 'MarketEditMenu',
  props: {
    market: {
      type: Object,
      required: true
    }
  },
  methods: {
    tabs () {
      const tabs = []
      const editTabs = this.marketEditTabs()
      this.$_.forEach(editTabs, (struct) => {
        tabs.push({
          href: this.localePath({
            name: 'markets-edit-id-tab',
            params: {
              id: this.$route.params.id,
              tab: this.localeMarketEditTab(struct.tab)
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
