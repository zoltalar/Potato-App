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
        <b-alert class="mb-4" variant="success" :show="hasFlashMessage()" @dismissed="clearFlashMessage()" dismissible>
          {{ flashMessage() }}
        </b-alert>
        <div v-if="favorites.length > 0">
          <p v-html="$t('messages.account_favorites')"></p>
          <div class="list-favorites" v-for="(favorite, i) in pagedFavorites" :key="'favorite-list-item-' + i">
            <farm-list-item-card class="mb-4" :farm="favorite.favoriteable" :linkable-image="true" v-if="favorite.favoriteable_type === 'farm'">
              <template v-slot:links>
                <a :href="localePath('/account/favorites')" class="card-link" @click.prevent="destroy(favorite)">{{ $t('phrases.delete') }}</a>
                <nuxt-link :to="localePath({ name: 'farms-show-id-name', params: { id: favorite.favoriteable.id, name: slugify(favorite.favoriteable.name) } })" class="card-link">{{ $t('phrases.view') }}</nuxt-link>
              </template>
            </farm-list-item-card>
            <market-list-item-card class="mb-4" :market="favorite.favoriteable" :linkable-image="true" v-else-if="favorite.favoriteable_type === 'market'">
              <template v-slot:links>
                <a :href="localePath('/account/favorites')" class="card-link" @click.prevent="destroy(favorite)">{{ $t('phrases.delete') }}</a>
                <nuxt-link :to="localePath({ name: 'markets-show-id-name', params: { id: favorite.favoriteable.id, name: slugify(favorite.favoriteable.name) } })" class="card-link">{{ $t('phrases.view') }}</nuxt-link>
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
        {
          hid: 'description',
          name: 'description',
          content: this.$t('messages.meta_description_my_account_favorites')
        }
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
              this.fetch()
            }
          })
      }
    },
    fetch () {
      this
        .$axios
        .get('/api/potato/account/favorites')
        .then((response) => {
          this.favorites = this.$_.get(response, 'data.data')
        })
    }
  },
  mounted() {
    this.fetch()
  }
}
</script>
