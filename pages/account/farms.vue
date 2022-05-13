<template>
  <div class="account home">
    <page-title>
      {{ $t('phrases.my_account') }}
    </page-title>
    <page-aside-content>
      <template v-slot:aside>
        <my-account-menu class="mb-4" />
      </template>
      <template>
        <b-alert variant="success" :show="hasFlashMessage()" dismissible>
          {{ flashMessage() }}
        </b-alert>
        <div class="mb-4" v-if="farms.length === 0">
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
      title: this.$t('phrases.my_account'),
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
    farms: []
  })
}
</script>
