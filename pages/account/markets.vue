<template>
  <div class="account markets">
    <page-title>
      {{ $t('phrases.farmers_markets') }}
    </page-title>
    <page-aside-content>
      <template v-slot:aside>
        <my-account-menu class="mb-4" />
      </template>
      <template>
        <b-alert class="mb-4" variant="danger" :show="hasErrorMessage()" @dismissed="clearErrorMessage()" dismissible>
          {{ flashErrorMessage() }}
          <nuxt-link :to="localePath({ name: 'email-resend' })" class="alert-link" v-if="isCurrentUserHasUnverifiedEmailFlashErrorMessage()">{{ $t('phrases.verify') }}</nuxt-link>
        </b-alert>
        <b-alert class="mb-4" variant="success" :show="hasFlashMessage()" @dismissed="clearFlashMessage()" dismissible>
          {{ flashMessage() }}
        </b-alert>
        <div class="list-markets" v-if="markets.length > 0">
          <p v-html="$t('messages.account_markets')"></p>
          <market-list-item-card class="mb-4" :market="market" :linkable-image="true" v-for="(market, i) in pagedMarkets" :key="'farm-list-item-' + i">
            <template v-slot:links>
              <nuxt-link :to="localePath({ name: 'markets-edit-tab-id', params: { tab: localeMarketEditTab('contact-information'), id: market.id } })" class="card-link">{{ $t('phrases.edit') }}</nuxt-link>
              <nuxt-link :to="localePath({ name: 'markets-deactivate-id', params: { id: market.id } })" class="card-link" v-if="marketIsActive(market)">{{ $t('phrases.deactivate') }}</nuxt-link>
              <nuxt-link :to="localePath({ name: 'markets-show-name-id', params: { name: slugify(market.name), id: market.id } })" class="card-link">{{ $t('phrases.view') }}</nuxt-link>
            </template>
          </market-list-item-card>
          <b-pagination
            class="mb-4"
            v-model="pagination.currentPage"
            :items="markets"
            :total-rows="markets.length"
            :per-page="pagination.perPage"
          />
        </div>
        <div class="mb-4" v-else>
          <p v-html="$t('messages.account_markets_empty')"></p>
        </div>
        <nuxt-link :to="localePath({ name: 'markets-create' })" class="btn btn-primary btn-lg">{{ $t('phrases.add_farmers_market') }}</nuxt-link>
      </template>
    </page-aside-content>
  </div>
</template>
<script>
export default {
  name: 'PageAccountMarkets',
  middleware: ['auth'],
  layout: 'default',
  head () {
    return {
      title: this.$t('phrases.farmers_markets'),
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: this.$t('messages.meta_description_my_account_markets')
        }
      ],
    }
  },
  nuxtI18n: {
    locales: ['en', 'pl'],
    paths: {
      en: '/account/markets',
      pl: '/konto/agromarkety'
    }
  },
  async asyncData({ $axios }) {
    try {
      const response = await $axios.get('/api/potato/account/markets')
      return { markets: response.data.data }
    } catch (error) {}
  },
  data: () => ({
    markets: [],
    pagination: {
      currentPage: 1,
      perPage: 10
    }
  }),
  computed: {
    pagedMarkets () {
      const markets = this.markets
      const pagination = this.pagination
      const start = (pagination.currentPage - 1) * pagination.perPage
      const end = pagination.currentPage * pagination.perPage
      return markets.slice(start, end)
    }
  },
  mounted() {
    this.currentUserHasUnverifiedEmailFlashErrorMessage()
  }
}
</script>
