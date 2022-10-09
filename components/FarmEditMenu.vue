<template>
  <b-list-group>
    <nuxt-link :to="tab.href" class="list-group-item list-group-item-action" v-for="(tab, i) in tabs()" :key="'farm-edit-tab-' + i">{{ tab.title }}</nuxt-link>
    <nuxt-link :to="localePath({ name: 'farms-show-name-id', params: { name: slugify(farm.name), id: farm.id } })" class="list-group-item list-group-item-action">{{ $t('phrases.view') }}</nuxt-link>
  </b-list-group>
</template>
<script>
export default{
  name: 'FarmEditMenu',
  props: {
    farm: {
      type: Object,
      required: true
    }
  },
  methods: {
    tabs () {
      const tabs = []
      const editTabs = this.farmEditTabs()
      this.$_.forEach(editTabs, (struct) => {
        tabs.push({
          href: this.localePath({
            name: 'farms-edit-tab-id',
            params: {
              tab: this.localeFarmEditTab(struct.tab),
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
