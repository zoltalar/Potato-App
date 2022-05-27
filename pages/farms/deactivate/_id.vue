<template>
  <div class="farms deactivate">
    <page-title>
      {{ $t('phrases.deactivate_farm') }}
      -
      {{ farm.name }}
    </page-title>
    <page-content-aside>
      <template>
        <p class="mb-4">{{ $t('messages.farm_deactivate') }}</p>
        <farm-deactivate-form :edited-farm="farm" />
      </template>
    </page-content-aside>
  </div>
</template>
<script>
export default {
  name: 'PageFarmsDeactivate',
  middleware: ['auth'],
  layout: 'default',
  head () {
    return {
      title: this.$t('phrases.deactivate_farm') + ' - ' + this.farm.name,
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: this.$t('messages.meta_description_farms_deactivate')
        }
      ],
    }
  },
  nuxtI18n: {
    locales: ['en', 'pl'],
    paths: {
      en: '/farms/deactivate/:id',
      pl: '/gospodarstwa-rolne/dezaktywuj/:id'
    }
  },
  data: () => ({
    farm: {}
  }),
  watch: {
    farm: {
      handler(farm) {
        if (this.$_.isEmpty(farm) || !this.isOwner()) {
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
    isOwner () {
      const user = this.$auth.user
      const farm = this.farm
      return user.id === farm.user_id
    }
  },
  mounted () {
    this.fetch()
  }
}
</script>
