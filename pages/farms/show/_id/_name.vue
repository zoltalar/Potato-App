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
        <farm-operating-hours :farm="farm" class="mt-4" />
      </template>
      <template>
        <b-alert class="mb-4" variant="success" :show="hasFlashMessage()" @dismissed="clearFlashMessage()" dismissible>
          {{ flashMessage() }}
        </b-alert>
        <farm-description :farm="farm" />
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
      title: this.farm.name,
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: this.$t('messages.meta_description_farms_show')
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
  data: () => ({
    farm: {}
  }),
  watch: {
    'farm': {
      handler (farm) {
        if (this.$_.isEmpty(farm)) {
          this.$router.push(this.localePath('/'))
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
      this.$root.$on('message-created', () => {
        this.$store.commit('flash/message', this.$t('messages.message_sent'))
      })
    }
  },
  created () {
    this.listen()
  },
  mounted () {
    this.fetch()
  }
}
</script>
