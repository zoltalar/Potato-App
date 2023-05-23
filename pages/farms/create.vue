<template>
  <div class="farms create">
    <page-title>
      {{ $t('phrases.add_farm') }}
    </page-title>
    <page-content-aside>
      <template>
        <b-alert class="mb-4" variant="danger" :show="hasErrorMessage()" @dismissed="clearErrorMessage()" dismissible>
          {{ flashErrorMessage() }}
        </b-alert>
        <farm-create-form />
      </template>
    </page-content-aside>
  </div>
</template>
<script>
export default {
  name: 'PageFarmsCreate',
  middleware: ['auth'],
  layout: 'default',
  head () {
    return {
      title: this.$t('phrases.add_farm'),
      meta: [
        { hid: 'description', name: 'description', content: this.$t('messages.meta_description_farms_add') },
        { hid: 'og:title', name: 'og:title', content: this.$t('phrases.add_farm') },
        { hid: 'og:description', name: 'og:description', content: this.$t('messages.meta_description_farms_add') },
        { hid: 'og:image', name: 'og:image', content: this.metaOgImage() },
      ],
    }
  },
  nuxtI18n: {
    locales: ['en', 'pl'],
    paths: {
      en: '/farms/create',
      pl: '/gospodarstwa-rolne/utworz'
    }
  },
  async fetch() {
    await this.loadResources()
  },
  methods: {
    listen () {
      this.$root.$on('farm-created', () => {
        this.$store.commit('flash/message', this.$t('messages.farm_created'))
        this.$router.push(this.localePath({ name: 'account-farms' }))
      })
    }
  },
  mounted() {
    this.listen()
  }
}
</script>
