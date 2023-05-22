<template>
  <div class="messages show" v-if="messageNotEmpty(message)">
    <page-title>
      {{ $t('phrases.message_details') }}
    </page-title>
    <page-aside-content :col-main="{md: 9}" :col-aside="{md: 3}">
      <template v-slot:aside>
        <b-button-group class="mb-4">
          <nuxt-link :to="localePath({ name: 'account-messages' })" class="btn btn-primary">{{ $t('phrases.back') }}</nuxt-link>
          <b-button variant="secondary" @click.prevent="destroy">{{ $t('phrases.delete') }}</b-button>
        </b-button-group>
      </template>
      <template>
        <b-alert class="mb-4" variant="success" :show="hasFlashMessage()" @dismissed="clearFlashMessage()" dismissible>
          {{ flashMessage() }}
        </b-alert>
        <b-card class="mb-4" no-body>
          <b-card-body>
            <b-card-title class="h5">{{ message.subject }}</b-card-title>
            <b-card-text v-html="nl2br(message.content)" v-if="message.content"></b-card-text>
          </b-card-body>
          <b-card-footer>
            <small class="text-muted">
              {{ $t('messages.message_footer', { ago: dateTimeFromNow(message.created_at), user: fullName(message.sender, true) }) }}
            </small>
          </b-card-footer>
        </b-card>
        <b-button variant="primary" size="lg" @click.prevent="reply">{{ $t('phrases.reply') }}</b-button>
        <b-modal id="modal-message-reply" :title="$t('phrases.message_reply')" @ok="send" no-enforce-focus>
          <message-reply-form :reply="message" ref="form-message-reply" />
        </b-modal>
      </template>
    </page-aside-content>
  </div>
</template>
<script>
export default {
  name: 'PageMessagesShow',
  middleware: ['auth'],
  layout: 'default',
  head () {
    return {
      title: this.message.subject,
      meta: [
        { hid: 'description', name: 'description', content: this.$t('messages.meta_description_messages_show') },
        { hid: 'og:title', name: 'og:title', content: this.message.subject },
        { hid: 'og:description', name: 'og:description', content: this.$t('messages.meta_description_messages_show') },
        { hid: 'og:image', name: 'og:image', content: this.metaOgImage() },
      ],
    }
  },
  nuxtI18n: {
    locales: ['en', 'pl'],
    paths: {
      en: '/messages/show/:token',
      pl: '/wiadomosci/pokaz/:token'
    }
  },
  async asyncData({ params, $axios, $auth }) {
    const token = params.token
    try {
      const response = await $axios.get(`/api/potato/messages/show/${token}`)
      $auth.fetchUser()
      return { message: response.data.data }
    } catch (error) {}
  },
  async fetch() {
    await this.loadResources()
  },
  data: () => ({
    message: {}
  }),
  watch: {
    'message': {
      handler (message) {
        if (this.$_.isEmpty(message)) {
          this.$router.push(this.localePath({ name: 'index' }))
        }
      },
      deep: true,
      immediate: true
    }
  },
  methods: {
    destroy () {
      const model = this.$t('phrases.message').toLowerCase()
      let message = this.$t('messages.confirm_model_destroy', { model })
      if (confirm(message)) {
        message = this.message
        this
          .$axios
          .delete(`/api/potato/messages/${message.token}`)
          .then(() => {
            this.$store.commit('flash/message', this.$t('messages.message_deleted'))
            this.$router.push(this.localePath({ name: 'account-messages' }))
          })
      }
    },
    listen () {
      this.$root.$on('message-replied', () => {
        this.$bvModal.hide('modal-message-reply')
        this.$store.commit('flash/message', this.$t('messages.message_sent'))
      })
    },
    reply () {
      this.$bvModal.show('modal-message-reply')
    },
    send (event) {
      event.preventDefault()
      this.$refs['form-message-reply'].send()

      return
    }
  },
  created () {
    this.listen()
  }
}
</script>
