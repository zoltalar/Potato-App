<template>
  <header class="site-header">
    <b-container>
      <b-navbar class="navbar-primary" toggleable="lg">
        <nuxt-link :to="localePath('/')" class="navbar-brand">
          {{ $t('messages.codename') }}
        </nuxt-link>
        <b-navbar-toggle target="nav-primary-collapse"></b-navbar-toggle>
        <b-collapse id="nav-primary-collapse" is-nav>
          <b-navbar-nav class="ml-auto">
            <li class="nav-item" v-if=" ! $auth.loggedIn">
              <nuxt-link :to="localePath('/register')" class="nav-link">{{ $t('phrases.register') }}</nuxt-link>
            </li>
            <li class="nav-item" v-if=" ! $auth.loggedIn">
              <nuxt-link :to="localePath('/login')" class="nav-link">{{ $t('phrases.login') }}</nuxt-link>
            </li>
            <b-nav-item-dropdown class="nav-item-user" right v-if="$auth.loggedIn">
              <template v-slot:button-content>
                {{ $auth.user.first_name }}
                <b-badge variant="danger" pill v-if="hasMessages()">
                  <font-awesome-icon icon="bell" />
                </b-badge>
              </template>
              <li role="presentation">
                <nuxt-link :to="localePath('/account/farms')" class="dropdown-item" role="menuitem">{{ $t('phrases.my_account') }}</nuxt-link>
              </li>
              <li role="presentation">
                <nuxt-link :to="localePath('/account/messages')" class="dropdown-item" role="menuitem">
                  {{ $t('phrases.messages') }}
                  ({{ messages.length }})
                </nuxt-link>
              </li>
              <b-dropdown-item href="/logout" @click.prevent="logout">{{ $t('phrases.logout') }}</b-dropdown-item>
            </b-nav-item-dropdown>
            <b-nav-item v-b-modal.modal-region-language>
              <img :src="countryFlag(defaultCountry())" />
            </b-nav-item>
          </b-navbar-nav>
        </b-collapse>
      </b-navbar>
    </b-container>
    <b-modal id="modal-region-language" :title="$t('phrases.language_and_region')" @shown="populateI18n" @ok="saveI18n" no-enforce-focus>
      <language-region-form ref="form-language-region" />
      <template #modal-footer="{ ok, cancel, hide }">
        <b-button variant="secondary" @click="cancel()">
          {{ $t('phrases.cancel') }}
        </b-button>
        <b-button variant="primary" @click="ok()">
          {{ $t('phrases.ok') }}
        </b-button>
      </template>
    </b-modal>
  </header>
</template>
<script>
export default {
  name: 'TheHeader',
  computed: {
    messages () {
      return this.$_.get(this.$auth.user, 'received_messages', [])
    }
  },
  methods: {
    hasMessages () {
      return this.messages.length > 0
    },
    populateI18n () {
      const form = this.$refs['form-language-region']
      form.populate()
    },
    saveI18n () {
      this.$bvModal.hide('modal-region-language')

      const form = this.$refs['form-language-region']
      const locale = this.$i18n.locale
      const language = form.language()

      this.$store.dispatch('country/code', form.country())
      this.$store.dispatch('language/code', language)

      if (locale !== language) {
        this.$router.push(this.localePath('/', language))
      }

      return
    }
  }
}
</script>
