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
        <h5 class="mb-4">{{ $t('phrases.contact_information') }}</h5>
        <b-row>
          <b-col md="6">
            <farm-contact-information-form :edited-farm="farm" />
          </b-col>
        </b-row>
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
    }
  },
  mounted () {
    this.fetch()
    this.listen()
  }
}
</script>
