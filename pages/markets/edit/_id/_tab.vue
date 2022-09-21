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
        <div v-else-if="marketEditTab() === 'products'">
          <h5 class="mb-2">{{ $t('phrases.products') }}</h5>
          <p class="mb-4" v-html="$t('messages.market_products')"></p>
          <products-form :productable="market" type="market" />
        </div>
        <div v-else-if="marketEditTab() === 'photos'">
          <h5 class="mb-2">{{ $t('phrases.photos') }}</h5>
          <p class="mb-4" v-html="$t('messages.market_photos')"></p>
          <b-row>
            <b-col md="6">
              <image-create-form :imageable="market" type="market" />
            </b-col>
          </b-row>
          <b-row class="mt-4" v-if="hasImages()">
            <b-col md="4" v-for="(image, i) in images" :key="'farm-image-' + i">
              <image-list-item :image="image" :imageable="market" type="market" />
            </b-col>
          </b-row>
        </div>
      </template>
    </page-aside-content>
    <b-modal id="modal-market-image-edit" :title="$t('phrases.edit_photo')" @ok="updateImage">
      <image-edit-form :edited-image="image" type="market" :imageable="market" ref="form-market-image-edit" />
      <template #modal-footer="{ ok, cancel, hide }">
        <b-button variant="secondary" @click="cancel()">
          {{ $t('phrases.cancel') }}
        </b-button>
        <b-button variant="primary" @click="ok()">
          {{ $t('phrases.ok') }}
        </b-button>
      </template>
    </b-modal>
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
      this.$root.$off('market-image-created')
      this.$root.$off('market-image-deleted')
      this.$root.$off('market-image-edit')
      this.$root.$off('market-image-updated')
      this.$root.$off('market-mailing-address-updated')
      this.$root.$off('market-operating-hours-updated')
      this.$root.$off('market-products-saved')

      this.$root.$on('market-address-updated', () => {
        this.$store.commit('flash/message', this.$t('messages.market_address_updated'))
      })
      this.$root.$on('market-contact-information-updated', () => {
        this.$store.commit('flash/message', this.$t('messages.market_contact_information_updated'))
      })
      this.$root.$on('market-description-updated', () => {
        this.$store.commit('flash/message', this.$t('messages.market_description_updated'))
      })
      this.$root.$on('market-image-created', () => {
        this.$store.commit('flash/message', this.$t('messages.market_image_created'))
        this.fetch()
      })
      this.$root.$on('market-image-deleted', () => {
        this.$store.commit('flash/message', this.$t('messages.market_image_deleted'))
        this.fetch()
      })
      this.$root.$on('market-image-edit', ({ image }) => {
        this.editImage(image)
      })
      this.$root.$on('market-image-updated', () => {
        this.$bvModal.hide('modal-market-image-edit')
        this.$store.commit('flash/message', this.$t('messages.market_image_updated'))
        this.fetch()
      })
      this.$root.$on('market-mailing-address-updated', () => {
        this.$store.commit('flash/message', this.$t('messages.market_mailing_address_updated'))
      })
      this.$root.$on('market-operating-hours-updated', () => {
        this.$store.commit('flash/message', this.$t('messages.market_operating_hours_updated'))
      })
      this.$root.$on('market-products-saved', () => {
        this.$store.commit('flash/message', this.$t('messages.market_products_saved'))
      })
    },
    updateImage (event) {
      event.preventDefault()
      this.$refs['form-market-image-edit'].update()

      return
    }
  },
  mounted () {
    this.fetch()
    this.listen()
  }
}
</script>
