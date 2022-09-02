<template>
  <b-list-group>
    <nuxt-link :to="tab.href" class="list-group-item list-group-item-action" v-for="(tab, i) in tabs()" :key="'my-account-tab-' + i">{{ tab.title }}</nuxt-link>
  </b-list-group>
</template>
<script>
export default{
  name: 'MyAccountMenu',
  methods: {
    tabs () {
      return [
        {
          href: this.localePath('/account/farms'),
          title: this.$t('phrases.farms')
        },
        {
          href: this.localePath('/account/markets'),
          title: this.$t('phrases.farm_markets')
        },
        {
          href: this.localePath('/account/favorites'),
          title: this.$t('phrases.favorites') },
        {
          href: this.localePath('/account/messages'),
          title: this.$t('phrases.messages')
        },
        {
          href: this.localePath('/account/reviews'),
          title: this.$t('phrases.reviews') },
        {
          href: this.localePath('/account/contact-information'),
          title: this.$t('phrases.contact_information')
        },
        {
          href: this.localePath('/account/password'),
          title: this.$t('phrases.password')
        }
      ]
    }
  }
}
</script>
