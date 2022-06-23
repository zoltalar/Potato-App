<template>
  <div class="account farms">
    <page-title>
      {{ $t('phrases.farms') }}
    </page-title>
    <page-aside-content>
      <template v-slot:aside>
        <my-account-menu class="mb-4" />
      </template>
      <template>
        <b-alert class="mb-4" variant="success" :show="hasFlashMessage()" @dismissed="clearFlashMessage()" dismissible>
          {{ flashMessage() }}
        </b-alert>
        <div class="list-farms" v-if="farms.length > 0">
          <p v-html="$t('messages.account_farms')"></p>
          <farm-list-item class="mb-4" :farm="farm" v-for="(farm, i) in pagedFarms" :key="'farm-list-item-' + i">
            <template v-slot:links>
              <nuxt-link :to="localePath({ name: 'farms-edit-id-tab', params: { id: farm.id, tab: localeFarmEditTab('contact-information') } })" class="card-link">{{ $t('phrases.edit') }}</nuxt-link>
              <nuxt-link :to="localePath({ name: 'farms-deactivate-id', params: { id: farm.id } })" class="card-link" v-if="farmIsActive(farm)">{{ $t('phrases.deactivate') }}</nuxt-link>
              <nuxt-link :to="localePath({ name: 'farms-show-id-name', params: { id: farm.id, name: slugify(farm.name) } })" class="card-link">{{ $t('phrases.view') }}</nuxt-link>
            </template>
          </farm-list-item>
          <b-pagination
            class="mb-4"
            v-model="pagination.currentPage"
            :items="farms"
            :total-rows="farms.length"
            :per-page="pagination.perPage"
          />
        </div>
        <div class="mb-4" v-else>
          <p v-html="$t('messages.account_farms_empty')"></p>
        </div>
        <nuxt-link :to="localePath('/farms/create')" class="btn btn-primary btn-lg">{{ $t('phrases.add_farm') }}</nuxt-link>
      </template>
    </page-aside-content>
  </div>
</template>
<script>
export default {
  name: 'PageAccountFarms',
  middleware: ['auth'],
  layout: 'default',
  head () {
    return {
      title: this.$t('phrases.farms'),
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: this.$t('messages.meta_description_my_account_farms')
        }
      ],
    }
  },
  nuxtI18n: {
    locales: ['en', 'pl'],
    paths: {
      en: '/account/farms',
      pl: '/konto/gospodarstwa-rolne'
    }
  },
  data: () => ({
    farms: [],
    pagination: {
      currentPage: 1,
      perPage: 10
    }
  }),
  computed: {
    pagedFarms () {
      const farms = this.farms
      const pagination = this.pagination
      const start = (pagination.currentPage - 1) * pagination.perPage
      const end = pagination.currentPage * pagination.perPage
      return farms.slice(start, end)
    }
  },
  methods: {
    fetch() {
      this
        .$axios
        .get('/api/potato/account/farms')
        .then((response) => {
          this.farms = this._.get(response, 'data.data')
        })
    }
  },
  mounted() {
    this.fetch()
  }
}
</script>
