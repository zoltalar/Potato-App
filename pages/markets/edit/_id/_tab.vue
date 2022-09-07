<template>
  <div class="markets edit">
    <page-title>
      {{ $t('phrases.edit_farmers_market') }}
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
        <div v-else-if="marketEditTab() === 'mailing-address'">
          <h5 class="mb-2">{{ $t('phrases.mailing_address') }}</h5>
          <p class="mb-4">{{ $t('messages.market_mailing_address') }}</p>
          <b-row>
            <b-col md="6">
              <market-mailing-address-form :edited-market="market" />
            </b-col>
          </b-row>
        </div>
        <div v-else-if="marketEditTab() === 'description'">
          <h5 class="mb-2">{{ $t('phrases.description') }}</h5>
          <p class="mb-4">{{ $t('messages.market_description') }}</p>
          <market-description-form :edited-market="market" />
        </div>
        <div v-else-if="marketEditTab() === 'operating-hours'">
          <h5 class="mb-2">{{ $t('phrases.operating_hours') }}</h5>
          <p class="mb-4" v-html="$t('messages.market_operating_hours')"></p>
          <market-operating-hours-form :operatable="market" type="market" />
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
      title: this.$t('phrases.edit_farmers_market'),
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: this.$t('messages.meta_description_farmers_market_edit')
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
    },
    listen () {
      this.$root.$off('market-address-updated')
      this.$root.$off('market-description-updated')
      this.$root.$off('market-mailing-address-updated')

      this.$root.$on('market-address-updated', () => {
        this.$store.commit('flash/message', this.$t('messages.market_address_updated'))
      })
      this.$root.$on('market-contact-information-updated', () => {
        this.$store.commit('flash/message', this.$t('messages.market_contact_information_updated'))
      })
      this.$root.$on('market-description-updated', () => {
        this.$store.commit('flash/message', this.$t('messages.market_description_updated'))
      })
      this.$root.$on('market-mailing-address-updated', () => {
        this.$store.commit('flash/message', this.$t('messages.market_mailing_address_updated'))
      })
    }
  },
  mounted () {
    this.fetch()
    this.listen()
  }
}
</script>
