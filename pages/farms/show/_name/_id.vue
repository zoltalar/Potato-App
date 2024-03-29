<template>
  <div class="farms show" v-if="farmNotEmpty(farm)">
    <page-cover :imageable="farm" type="farm" />
    <page-title>
      {{ farm.name }}
    </page-title>
    <page-aside-content :col-aside="{ md: 4, lg: 4 }" :col-main="{ md: 8, lg: 8 }">
      <template v-slot:aside>
        <image-primary :imageable="farm" type="farm" class="mb-3" />
        <farm-buttons-menu :farm="farm" />
        <farm-contact-information :farm="farm" class="mt-4" />
        <farm-operating-hours :farm="farm" class="mt-4 mb-4" />
      </template>
      <template>
        <b-alert class="mb-4" variant="danger" :show="!farmIsActive(farm)">
          {{ $t('messages.farm_inactive') }}
        </b-alert>
        <b-alert class="mb-4" variant="success" :show="hasFlashMessage()" @dismissed="clearFlashMessage()" dismissible>
          {{ flashMessage() }}
        </b-alert>
        <b-row class="mb-4">
          <b-col>
            <b-row>
              <b-col>
                <b-form-rating
                  variant="warning"
                  size="lg"
                  class="p-0"
                  :value="farm.average_rating"
                  :title="$t('messages.reviews_count', { count: farm.reviews_count })"
                  no-border
                  inline
                  readonly />
              </b-col>
            </b-row>
          </b-col>
          <b-col>
            <social-media :linkable="farm" type="farm" class="text-right" />
          </b-col>
        </b-row>
        <farm-description :farm="farm" class="mb-4" />
        <products :productable="farm" type="farm" class="mb-4" />
        <eventable-events :eventable="farm" class="mb-4" />
        <reviewable-reviews :reviewable="farm" />
      </template>
    </page-aside-content>
  </div>
</template>
<script>
export default {
  name: 'PageFarmsShow',
  layout: 'default',
  head () {
    return {
      title: this.$t('messages.page_title_farms_show', { name: this.farm.name, address: this.addressLine(this.addressableAddress(this.farm)) }),
      meta: [
        { hid: 'description', name: 'description', content: this.$t('messages.meta_description_farms_show', { name: this.farm.name }) },
        { hid: 'og:title', name: 'og:title', content: this.$t('messages.page_title_farms_show', { name: this.farm.name, address: this.addressLine(this.addressableAddress(this.farm)) }) },
        { hid: 'og:description', name: 'og:description', content: this.$t('messages.meta_description_farms_show', { name: this.farm.name }) },
        { hid: 'og:image', name: 'og:image', content: this.metaOgImage() },
      ],
    }
  },
  nuxtI18n: {
    locales: ['en', 'pl'],
    paths: {
      en: '/farms/:name/:id',
      pl: '/gospodarstwa-rolne/:name/:id'
    }
  },
  async asyncData({ params, $axios }) {
    const id = params.id
    try {
      const response = await $axios.get(`/api/potato/farms/show/${id}`)
      return { farm: response.data.data }
    } catch (error) {}
  },
  async fetch() {
    await this.loadResources()
  },
  data: () => ({
    farm: {}
  }),
  watch: {
    farm: {
      handler (farm) {
        if (this.$_.isEmpty(farm)) {
          this.$router.push(this.localePath({ name: 'index' }))
        }
      },
      deep: true,
      immediate: true
    }
  },
  methods: {
    listen () {
      this.$root.$on('comment-created', () => {
        this.$store.commit('flash/message', this.$t('messages.comment_created'))
        this.$nuxt.refresh()
      })
      this.$root.$on('farm-favorited', () => {
        this.$store.commit('flash/message', this.$t('messages.farm_favorited'))
        this.$nuxt.refresh()
      })
      this.$root.$on('message-created', () => {
        this.$store.commit('flash/message', this.$t('messages.message_sent'))
      })
      this.$root.$on('review-created', () => {
        this.$store.commit('flash/message', this.$t('messages.review_created'))
        this.$nuxt.refresh()
      })
    }
  },
  created () {
    this.listen()
  }
}
</script>
