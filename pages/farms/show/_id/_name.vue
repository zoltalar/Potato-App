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
      title: this.farm.name + ', ' + this.addressLine(this.addressableAddress(this.farm)),
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: this.$t('messages.meta_description_farms_show') + ': ' + this.farm.name
        }
      ],
    }
  },
  nuxtI18n: {
    locales: ['en', 'pl'],
    paths: {
      en: '/farms/show/:id/:name',
      pl: '/gospodarstwa-rolne/pokaz/:id/:name'
    }
  },
  async asyncData({ params, $axios }) {
    const id = params.id
    try {
      const response = await $axios.get(`/api/potato/farms/show/${id}`)
      return { farm: response.data.data }
    } catch (error) {}
  },
  data: () => ({
    farm: {}
  }),
  watch: {
    farm: {
      handler (farm) {
        if (this.$_.isEmpty(farm)) {
          this.$router.push(this.localePath('/'))
        }
      },
      deep: true,
      immediate: true
    }
  },
  methods: {
    fetch () {
      const id = this.$route.params.id
      this
        .$axios
        .get(`/api/potato/farms/show/${id}`)
        .then((response) => {
          this.farm = this.$_.get(response, 'data.data')
        })
    },
    listen () {
      this.$root.$on('farm-favorited', () => {
        this.$store.commit('flash/message', this.$t('messages.farm_favorited'))
        this.fetch()
      })
      this.$root.$on('message-created', () => {
        this.$store.commit('flash/message', this.$t('messages.message_sent'))
      })
      this.$root.$on('review-created', () => {
        this.$store.commit('flash/message', this.$t('messages.review_created'))
        this.fetch()
      })
    }
  },
  created () {
    this.listen()
  }
}
</script>
