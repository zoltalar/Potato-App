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
        <b-card class="card-default mt-4">
          <b-card-title class="h6 mb-1">{{ $t('phrases.contact_information') }}</b-card-title>
          <b-card-text>
            {{ fullName(farm, true) }}
            <span v-if="farmPublishPhone(farm)">
              <br />
              {{ farm.phone }}
            </span>
            <span v-if="farm.website">
              <br />
              <b-link :href="farm.website" target="_blank">{{ farm.website }}</b-link>
            </span>
          </b-card-text>
        </b-card>
      </template>
      <template>
        Test 2
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
      en: '/farms/show/:id',
      pl: '/gospodarstwa-rolne/pokaz/:id'
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
