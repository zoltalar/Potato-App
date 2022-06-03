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
          <nuxt-link :to="farmEditContactInformationLink(farm)" class="link-edit" :title="$t('phrases.edit_contact_information')" v-if="farmIsOwner(farm)">
            <font-awesome-icon icon="pencil-alt" />
          </nuxt-link>
          <b-card-title class="h6 mb-1">{{ $t('phrases.contact_information') }}</b-card-title>
          <b-card-text class="mb-4">
            <span v-if="farmIsNameable(farm)">{{ fullName(farm, true) }}</span>
            <span v-else> - </span>
            <span v-if="farmPublishPhone(farm)">
              <br />
              {{ farm.phone }}
            </span>
            <span v-if="farm.website">
              <br />
              <b-link :href="farm.website" target="_blank">{{ farm.website }}</b-link>
            </span>
          </b-card-text>
          <nuxt-link :to="farmEditAddressLink(farm)" class="link-edit" :title="$t('phrases.edit_address')" v-if="farmIsOwner(farm)">
            <font-awesome-icon icon="pencil-alt" />
          </nuxt-link>
          <b-card-title class="h6 mb-1">{{ $t('phrases.address') }}</b-card-title>
          <b-card-text class="mb-4">
            <span v-if="farmPublishAddress(farm)">{{ addressLine(address, ',', ['address', 'address_2', 'city', 'state', 'zip']) }}</span>
            <span v-else> - </span>
          </b-card-text>
          <nuxt-link :to="farmEditMailingAddressLink(farm)" class="link-edit" :title="$t('phrases.edit_mailing_address')" v-if="farmIsOwner(farm)">
            <font-awesome-icon icon="pencil-alt" />
          </nuxt-link>
          <b-card-title class="h6 mb-1">{{ $t('phrases.mailing_address') }}</b-card-title>
          <b-card-text>
            <span v-if="farmPublishMailingAddress(farm)">{{ addressLine(mailingAddress, ',', ['address', 'address_2', 'city', 'state', 'zip']) }}</span>
            <span v-else> - </span>
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
  computed: {
    address () {
      const farm = this.farm
      return this.farmAddress(farm)
    },
    mailingAddress () {
      const farm = this.farm
      return this.farmMailingAddress(farm)
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
