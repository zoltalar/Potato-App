<template>
  <div class="messages show" v-if="messageNotEmpty(message)">
    <page-title>
      {{ $t('phrases.message_details') }}
    </page-title>
    <page-aside-content :col-main="{md: 9}" :col-aside="{md: 3}">
      <template v-slot:aside>
        <b-button-group>
          <nuxt-link :to="localePath('/account/messages')" class="btn btn-primary">{{ $t('phrases.back') }}</nuxt-link>
          <b-button variant="danger" @click.prevent="destroy">{{ $t('phrases.delete') }}</b-button>
        </b-button-group>
      </template>
      <template>
        <b-card no-body>
          <b-card-body>
            <b-card-title class="h5">{{ message.subject }}</b-card-title>
            <b-card-text v-if="message.content">
              {{ nl2br(message.content) }}
            </b-card-text>
          </b-card-body>
          <b-card-footer>
            <small class="text-muted">
              {{ $t('messages.message_footer', { ago: dateTimeFromNow(message.created_at), user: fullName(message.sender, true) }) }}
            </small>
          </b-card-footer>
        </b-card>
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
        {
          hid: 'description',
          name: 'description',
          content: this.$t('messages.meta_description_messages_show')
        }
      ],
    }
  },
  nuxtI18n: {
    locales: ['en', 'pl'],
    paths: {
      en: '/messages/show/:id',
      pl: '/wiadomosci/pokaz/:id'
    }
  },
  data: () => ({
    message: {}
  }),
  watch: {
    'message': {
      handler (message) {
        if (this.$_.isEmpty(message)) {
          this.$router.push(this.localePath('/'))
        }
      },
      deep: true
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
          .delete(`/api/potato/messages/${message.id}`)
          .then(() => {
            this.$router.push(this.localePath('/account/messages'))
          })
      }
    },
    fetch () {
      const id = this.$route.params.id
      this
        .$axios
        .get(`/api/potato/messages/show/${id}`)
        .then((response) => {
          this.message = this.$_.get(response, 'data.data')
        })
    }
  },
  mounted() {
    this.fetch()
  }
}
</script>
