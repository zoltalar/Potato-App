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
          href: this.localePath({ name: 'account-farms' }),
          title: this.$t('phrases.farms')
        },
        {
          href: this.localePath({ name: 'account-markets' }),
          title: this.$t('phrases.farmers_markets')
        },
        {
          href: this.localePath({ name: 'account-favorites' }),
          title: this.$t('phrases.favorites') },
        {
          href: this.localePath({ name: 'account-messages' }),
          title: this.$t('phrases.messages')
        },
        {
          href: this.localePath({ name: 'account-reviews' }),
          title: this.$t('phrases.reviews') },
        {
          href: this.localePath({ name: 'account-contact-information' }),
          title: this.$t('phrases.contact_information')
        },
        {
          href: this.localePath({ name: 'account-password' }),
          title: this.$t('phrases.password')
        }
      ]
    }
  }
}
</script>
