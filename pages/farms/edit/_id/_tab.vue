<template>
  <div class="farms edit">
    <page-title>
      {{ $t('phrases.edit_farm') }}
    </page-title>
    <page-aside-content>
      <template v-slot:aside>
        <farm-edit-menu class="mb-4" />
      </template>
      <template>
        <b-alert class="mb-4" variant="success" :show="hasFlashMessage()" @dismissed="clearFlashMessage()" dismissible>
          {{ flashMessage() }}
        </b-alert>
        <div v-if="farmEditTab() === 'contact-information'">
          <h5 class="mb-4">{{ $t('phrases.contact_information') }}</h5>
          <b-row>
            <b-col md="6">
              <farm-contact-information-form :edited-farm="farm" />
            </b-col>
          </b-row>
        </div>
        <div v-else-if="farmEditTab() === 'address'">
          <h5 class="mb-4">{{ $t('phrases.address') }}</h5>
          <b-row>
            <b-col md="6">
              <farm-address-form :edited-farm="farm" />
            </b-col>
          </b-row>
        </div>
        <div v-else-if="farmEditTab() === 'mailing-address'">
          <h5 class="mb-2">{{ $t('phrases.mailing_address') }}</h5>
          <p class="mb-4">{{ $t('messages.farm_mailing_address') }}</p>
          <b-row>
            <b-col md="6">
              <farm-mailing-address-form :edited-farm="farm" />
            </b-col>
          </b-row>
        </div>
        <div v-else-if="farmEditTab() === 'description'">
          <h5 class="mb-2">{{ $t('phrases.description') }}</h5>
          <p class="mb-4">{{ $t('messages.farm_description') }}</p>
          <farm-description-form :edited-farm="farm" />
        </div>
        <div v-else-if="farmEditTab() === 'operating-hours'">
          <h5 class="mb-2">{{ $t('phrases.operating_hours') }}</h5>
          <p class="mb-4" v-html="$t('messages.farm_operating_hours')"></p>
          <farm-operating-hours-form :edited-farm="farm" />
        </div>
        <div v-else-if="farmEditTab() === 'photos'">
          <h5 class="mb-2">{{ $t('phrases.photos') }}</h5>
          <p class="mb-4" v-html="$t('messages.farm_photos')"></p>
          <b-row>
            <b-col md="6">
              <image-create-form :imageable="farm" type="farm" />
            </b-col>
          </b-row>
          <b-row class="mt-4" v-if="hasImages()">
            <b-col md="4" v-for="(image, i) in images">
              <image-list-item :image="image" />
            </b-col>
          </b-row>
        </div>
        <div v-else-if="farmEditTab() === 'social-media'">
          <h5 class="mb-4">{{ $t('phrases.social_media') }}</h5>
          <b-row>
            <b-col md="9">
              <farm-social-media-form :edited-farm="farm" />
            </b-col>
          </b-row>
        </div>
      </template>
    </page-aside-content>
  </div>
</template>
<script>
export default {
  name: 'PageFarmsEdit',
  middleware: ['auth'],
  layout: 'default',
  head () {
    return {
      title: this.$t('phrases.edit_farm'),
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: this.$t('messages.meta_description_farms_edit')
        }
      ],
    }
  },
  nuxtI18n: {
    locales: ['en', 'pl'],
    paths: {
      en: '/farms/edit/:id/:tab',
      pl: '/gospodarstwa-rolne/edytuj/:id/:tab'
    }
  },
  computed: {
    images () {
      const farm = this.farm
      return this.$_.get(farm, 'images', [])
    }
  },
  data: () => ({
    farm: {}
  }),
  watch: {
    'farm': {
      handler (farm) {
        if (this.$_.isEmpty(farm)) {
          this.$router.push(this.localePath('/account/farms'))
        }
      },
      deep: true
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
    hasImages () {
      return this.images.length > 0
    },
    listen () {
      this.$root.$on('farm-address-updated', () => {
        this.$store.commit('flash/message', this.$t('messages.farm_address_updated'))
      })
      this.$root.$on('farm-contact-information-updated', () => {
        this.$store.commit('flash/message', this.$t('messages.farm_contact_information_updated'))
      })
      this.$root.$on('farm-description-updated', () => {
        this.$store.commit('flash/message', this.$t('messages.farm_description_updated'))
      })
      this.$root.$on('farm-image-created', () => {
        this.$store.commit('flash/message', this.$t('messages.farm_image_created'))
      })
      this.$root.$on('farm-mailing-address-updated', () => {
        this.$store.commit('flash/message', this.$t('messages.farm_mailing_address_updated'))
      })
      this.$root.$on('farm-operating-hours-updated', () => {
        this.$store.commit('flash/message', this.$t('messages.farm_operating_hours_updated'))
      })
      this.$root.$on('farm-social-media-updated', () => {
        this.$store.commit('flash/message', this.$t('messages.farm_social_media_updated'))
      })
    }
  },
  mounted () {
    this.fetch()
    this.listen()
  }
}
</script>
