<template>
  <div class="farms show">
    <page-cover :imageable="farm" type="farm" />
    <page-title>
      {{ farm.name }}
    </page-title>
    <page-aside-content :col-aside="{ md: 4, lg: 4 }" :col-main="{ md: 8, lg: 8 }">
      <template v-slot:aside>
        <image-primary :imageable="farm" type="farm" class="mb-3" />
        <ul class="list-buttons">
          <li class="mb-3">
            <b-button variant="primary" size="lg" block>
              <font-awesome-icon icon="comment" />
              {{ $t('phrases.send_message') }}
            </b-button>
          </li>
          <li>
            <b-button variant="primary" size="lg" block>
              <font-awesome-icon icon="edit" />
              {{ $t('phrases.write_a_review') }}
            </b-button>
          </li>
        </ul>
        <farm-contact-information :farm="farm" class="mt-4" />
        <farm-operating-hours :farm="farm" class="mt-4" />
      </template>
      <template>
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
  },
  mounted() {
    this.fetch()
  }
}
</script>
