<template>
  <div class="farms create">
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
    listen () {
      this.$root.$on('farm-contact-information-updated', () => {
        this.$store.commit('flash/message', this.$t('messages.farm_contact_information_updated'))
      })
      this.$root.$on('farm-description-updated', () => {
        this.$store.commit('flash/message', this.$t('messages.farm_description_updated'))
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
