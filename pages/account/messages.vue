<template>
  <div class="account messages">
    <page-title>
      {{ $t('phrases.messages') }}
    </page-title>
    <page-aside-content>
      <template v-slot:aside>
        <my-account-menu class="mb-4" />
      </template>
      <template>
        <b-alert class="mb-4" variant="success" :show="hasFlashMessage()" @dismissed="clearFlashMessage()" dismissible>
          {{ flashMessage() }}
        </b-alert>
        <div v-if="messages.length > 0">
          <p v-html="$t('messages.account_messages')"></p>
          <ul class="list-messages">
            <message-list-item :message="message" v-for="(message, i) in messages" :key="'message-list-item-' + i" />
          </ul>
        </div>
        <div class="mb-4" v-else>
          <p v-html="$t('messages.account_messages_empty')"></p>
        </div>
      </template>
    </page-aside-content>
  </div>
</template>
<script>
export default {
  name: 'PageAccountMessages',
  middleware: ['auth'],
  layout: 'default',
  head () {
    return {
      title: this.$t('phrases.messages'),
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: this.$t('messages.meta_description_my_account_messages')
        }
      ],
    }
  },
  nuxtI18n: {
    locales: ['en', 'pl'],
    paths: {
      en: '/account/messages',
      pl: '/konto/wiadomosci'
    }
  },
  data: () => ({
    messages: []
  }),
  methods: {
    fetch() {
      this
        .$axios
        .get('/api/potato/account/messages')
        .then((response) => {
          this.messages = this._.get(response, 'data.data')
        })
    },
    read(message) {
      this.selectedMessage = message
      this.$bvModal.show('modal-message-read')
    }
  },
  mounted() {
    this.fetch()
  }
}
</script>
