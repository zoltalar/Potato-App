<template>
  <div class="markets edit">
    <page-title>
      {{ $t('phrases.edit_farm_market') }}
    </page-title>
    <page-aside-content>
      <template v-slot:aside>
        <market-edit-menu :market="market" class="mb-4" />
      </template>
      <template>
        <b-alert class="mb-4" variant="danger" :show="hasErrorMessage()" @dismissed="clearErrorMessage()" dismissible>
          {{ flashErrorMessage () }}
        </b-alert>
        <b-alert class="mb-4" variant="success" :show="hasFlashMessage()" @dismissed="clearFlashMessage()" dismissible>
          {{ flashMessage() }}
        </b-alert>
        <div v-if="marketEditTab() === 'contact-information'">
          <h5 class="mb-4">{{ $t('phrases.contact_information') }}</h5>
          <b-row>
            <b-col md="6">
              <market-contact-information-form :edited-market="market" />
            </b-col>
          </b-row>
        </div>
        <div v-else-if="marketEditTab() === 'address'">
          <h5 class="mb-4">{{ $t('phrases.address') }}</h5>
          <b-row>
            <b-col md="6">
              <market-address-form :edited-market="market" />
            </b-col>
          </b-row>
        </div>
      </template>
    </page-aside-content>
  </div>
</template>
<script>
export default {
  name: 'PageMarketsEdit',
  middleware: ['auth'],
  layout: 'default',
  head () {
    return {
      title: this.$t('phrases.edit_farm_market'),
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: this.$t('messages.meta_description_farm_market_edit')
        }
      ],
    }
  },
  nuxtI18n: {
    locales: ['en', 'pl'],
    paths: {
      en: '/markets/edit/:id/:tab',
      pl: '/agromarkety/edytuj/:id/:tab'
    }
  },
  computed: {
    images () {
      const market = this.market
      return this.$_.get(market, 'images', [])
    }
  },
  data: () => ({
    market: {},
    image: {}
  }),
  watch: {
    'market': {
      handler (market) {
        if (this.$_.isEmpty(market)) {
          this.$router.push(this.localePath('/account/markets'))
        }
      },
      deep: true
    }
  },
  methods: {
    editImage (image) {
      this.image = image
      this.$bvModal.show('modal-market-image-edit')
    },
    fetch () {
      const id = this.$route.params.id
      this
        .$axios
        .get(`/api/potato/markets/show/${id}`)
        .then((response) => {
          this.market = this.$_.get(response, 'data.data')
        })
    },
    hasImages () {
      return this.images.length > 0
    }
  },
  mounted () {
    this.fetch()
  }
}
</script>
