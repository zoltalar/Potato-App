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
        <b-alert class="mb-4" variant="danger" :show="hasErrorMessage()" @dismissed="clearErrorMessage()" dismissible>
          {{ flashErrorMessage() }}
          <nuxt-link :to="localePath({ name: 'email-resend' })" class="alert-link" v-if="isCurrentUserHasUnverifiedEmailFlashErrorMessage()">{{ $t('phrases.verify') }}</nuxt-link>
        </b-alert>
        <b-alert class="mb-4" variant="success" :show="hasFlashMessage()" @dismissed="clearFlashMessage()" dismissible>
          {{ flashMessage() }}
        </b-alert>
        <div v-if="messages.length > 0">
          <p class="mb-4" v-html="$t('messages.account_messages')"></p>
          <b-button-group size="sm" class="mb-3">
            <b-button variant="secondary" :title="$t('phrases.toggle_messages')">
              <input type="checkbox" v-model="toggle" />
            </b-button>
            <b-button variant="secondary" :title="$t('phrases.refresh')" @click.prevent="fetch">
              <font-awesome-icon icon="sync" :class="{'fa-spin': busy}" />
            </b-button>
            <b-button variant="secondary" :title="$t('phrases.delete_selected_messages')" @click.prevent="destroyBatch">
              <font-awesome-icon icon="trash" />
            </b-button>
          </b-button-group>
          <ul class="list-messages">
            <message-list-item :message="message" v-for="(message, i) in pagedMessages" :key="'message-list-item-' + i" />
          </ul>
          <b-pagination
            v-model="pagination.currentPage"
            :items="messages"
            :total-rows="messages.length"
            :per-page="pagination.perPage"
          />
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
  async asyncData({ $axios }) {
    try {
      const response = await $axios.get('/api/potato/account/messages')
      return { messages: response.data.data }
    } catch (error) {}
  },
  async fetch() {
    await this.loadResources()
  },
  data: () => ({
    messages: [],
    pagination: {
      currentPage: 1,
      perPage: 10
    },
    toggle: false,
    ids: [],
    busy: false
  }),
  computed: {
    pagedMessages () {
      const messages = this.messages
      const pagination = this.pagination
      const start = (pagination.currentPage - 1) * pagination.perPage
      const end = pagination.currentPage * pagination.perPage
      return messages.slice(start, end)
    }
  },
  watch: {
    toggle: {
      handler (toggle) {
        this.$root.$emit('toggle-messages', { toggle })
      }
    }
  },
  methods: {
    destroyBatch () {
      const ids = this.$_.filter(this.ids, (id) => {
        return this.$_.isNumber(id)
      })
      const models = this.$t('phrases.messages').toLowerCase()
      const message = this.$t('messages.confirm_models_destroy_batch', { models })
      if (ids.length === 0) {
        alert(this.$t('messages.alert_selected_messages_empty'))
      } else if (confirm(message)) {
        this
          .$axios
          .post('/api/potato/messages/destroy-batch', { ids })
          .then((response) => {
            if (response.status === 204) {
              this.$store.commit('flash/message', this.$t('messages.messages_deleted'))
              this.fetch()
            }
          })
      }
    },
    fetch () {
      this.busy = true
      this
        .$axios
        .get('/api/potato/account/messages')
        .then((response) => {
          this.messages = this.$_.get(response, 'data.data')
          setTimeout(() => {
            this.busy = false
          }, 1000)
        })
    },
    listen () {
      this.$root.$on('toggle-message', ({toggle, id}) => {
        if (toggle) {
          if (this.$_.isNumber(id)) {
            this.ids.push(id)
          }
        } else {
          this.$_.pull(this.ids, id)
        }
      })
    }
  },
  created () {
    this.listen()
  },
  mounted () {
    this.currentUserHasUnverifiedEmailFlashErrorMessage()
  }
}
</script>
