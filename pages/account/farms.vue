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
        <b-alert class="mb-4" variant="danger" :show="hasErrorMessage()" @dismissed="clearErrorMessage()" dismissible>
          {{ flashErrorMessage() }}
          <nuxt-link :to="localePath({ name: 'email-verify' })" class="alert-link" v-if="isCurrentUserHasUnverifiedEmailFlashErrorMessage()">{{ $t('phrases.verify') }}</nuxt-link>
        </b-alert>
        <b-alert class="mb-4" variant="success" :show="hasFlashMessage()" @dismissed="clearFlashMessage()" dismissible>
          {{ flashMessage() }}
        </b-alert>
        <div class="list-farms" v-if="farms.length > 0">
          <p v-html="$t('messages.account_farms')"></p>
          <farm-list-item-card class="mb-4" :farm="farm" :linkable-image="true" v-for="(farm, i) in pagedFarms" :key="'farm-list-item-' + i">
            <template v-slot:links>
              <nuxt-link :to="localePath({ name: 'farms-edit-tab-id', params: { tab: localeFarmEditTab('contact-information'), id: farm.id } })" class="card-link">{{ $t('phrases.edit') }}</nuxt-link>
              <nuxt-link :to="localePath({ name: 'farms-deactivate-id', params: { id: farm.id } })" class="card-link" v-if="farmIsActive(farm)">{{ $t('phrases.deactivate') }}</nuxt-link>
              <nuxt-link :to="localePath({ name: 'farms-show-name-id', params: { name: slugify(farm.name), id: farm.id } })" class="card-link">{{ $t('phrases.view') }}</nuxt-link>
            </template>
          </farm-list-item-card>
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
        <nuxt-link :to="localePath({ name: 'farms-create' })" class="btn btn-primary btn-lg">{{ $t('phrases.add_farm') }}</nuxt-link>
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
        { hid: 'description', name: 'description', content: this.$t('messages.meta_description_my_account_farms') },
        { hid: 'og:title', name: 'og:title', content: this.$t('phrases.farms') },
        { hid: 'og:description', name: 'og:description', content: this.$t('messages.meta_description_my_account_farms') },
        { hid: 'og:image', name: 'og:image', content: this.metaOgImage() },
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
  async asyncData({ $axios }) {
    try {
      const response = await $axios.get('/api/potato/account/farms')
      return { farms: response.data.data }
    } catch(error) {}
  },
  async fetch() {
    await this.loadResources()
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
  mounted() {
    this.currentUserHasUnverifiedEmailFlashErrorMessage()
  }
}
</script>
