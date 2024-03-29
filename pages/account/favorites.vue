<template>
  <div class="account favorites">
    <page-title>
      {{ $t('phrases.favorites') }}
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
        <div v-if="favorites.length > 0">
          <p v-html="$t('messages.account_favorites')"></p>
          <div class="list-favorites" v-for="(favorite, i) in pagedFavorites" :key="'favorite-list-item-' + i">
            <farm-list-item-card class="mb-4" :farm="favorite.favoriteable" :linkable-image="true" v-if="favorite.favoriteable_type === 'farm'">
              <template v-slot:links>
                <a :href="localePath({ name: 'account-favorites' })" class="card-link" @click.prevent="destroy(favorite)">{{ $t('phrases.delete') }}</a>
                <nuxt-link :to="localePath({ name: 'farms-show-name-id', params: { name: slugify(favorite.favoriteable.name), id: favorite.favoriteable.id } })" class="card-link">{{ $t('phrases.view') }}</nuxt-link>
              </template>
            </farm-list-item-card>
            <market-list-item-card class="mb-4" :market="favorite.favoriteable" :linkable-image="true" v-else-if="favorite.favoriteable_type === 'market'">
              <template v-slot:links>
                <a :href="localePath({ name: 'account-favorites' })" class="card-link" @click.prevent="destroy(favorite)">{{ $t('phrases.delete') }}</a>
                <nuxt-link :to="localePath({ name: 'markets-show-name-id', params: { name: slugify(favorite.favoriteable.name), id: favorite.favoriteable.id } })" class="card-link">{{ $t('phrases.view') }}</nuxt-link>
              </template>
            </market-list-item-card>
          </div>
          <b-pagination
            v-model="pagination.currentPage"
            :items="favorites"
            :total-rows="favorites.length"
            :per-page="pagination.perPage"
          />
        </div>
        <div v-else>
          <p v-html="$t('messages.account_favorites_empty')"></p>
        </div>
      </template>
    </page-aside-content>
  </div>
</template>
<script>
export default {
  name: 'PageAccountFavorites',
  middleware: ['auth'],
  layout: 'default',
  head () {
    return {
      title: this.$t('phrases.favorites'),
      meta: [
        { hid: 'description', name: 'description', content: this.$t('messages.meta_description_my_account_favorites') },
        { hid: 'og:title', name: 'og:title', content: this.$t('phrases.favorites') },
        { hid: 'og:description', name: 'og:description', content: this.$t('messages.meta_description_my_account_favorites') },
        { hid: 'og:image', name: 'og:image', content: this.metaOgImage() },
      ],
    }
  },
  nuxtI18n: {
    locales: ['en', 'pl'],
    paths: {
      en: '/account/favorites',
      pl: '/konto/ulubione'
    }
  },
  async asyncData({ $axios }) {
    try {
      const response = await $axios.get('/api/potato/account/favorites')
      return { favorites: response.data.data }
    } catch(error) {}
  },
  async fetch() {
    await this.loadResources()
  },
  data: () => ({
    favorites: [],
    pagination: {
      currentPage: 1,
      perPage: 10
    }
  }),
  computed: {
    pagedFavorites () {
      const favorites = this.favorites
      const pagination = this.pagination
      const start = (pagination.currentPage - 1) * pagination.perPage
      const end = pagination.currentPage * pagination.perPage
      return favorites.slice(start, end)
    }
  },
  methods: {
    destroy (favorite) {
      const message = this.$t('messages.confirm_destroy')
      if (confirm(message)) {
        this
          .$axios
          .delete(`/api/potato/favorites/${favorite.id}`)
          .then((response) => {
            if (response.status === 204) {
              this.$store.commit('flash/message', this.$t('messages.favorite_deleted'))
              this.$nuxt.refresh()
            }
          })
      }
    }
  },
  mounted() {
    this.currentUserHasUnverifiedEmailFlashErrorMessage()
  }
}
</script>
