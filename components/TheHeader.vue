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
            <li class="nav-item">
              <nuxt-link :to="localePath('/register')" class="nav-link">{{ $t('phrases.register') }}</nuxt-link>
            </li>
            <b-nav-item href="#">{{ $t('phrases.login') }}</b-nav-item>
            <b-nav-item-dropdown :text="$t('phrases.language')">
              <li role="presentation" v-for="(language, i) in languageCollection()">
                <nuxt-link :to="switchLocalePath(language.code)" class="dropdown-item" role="menuitem">{{ language.native }}</nuxt-link>
              </li>
            </b-nav-item-dropdown>
            <b-nav-item v-b-modal.modal-region-language>
              <img :src="require('@/assets/images/flag/poland.svg')" />
            </b-nav-item>
          </b-navbar-nav>
        </b-collapse>
      </b-navbar>
    </b-container>
    <b-modal id="modal-region-language" centered :title="$t('phrases.language_and_region')" @ok="saveI18n" no-enforce-focus>
      <language-region-form ref="form-language-region" />
    </b-modal>
  </header>
</template>
<script>
export default {
  name: 'TheHeader',
  methods: {
    saveI18n (event) {
      event.preventDefault()

      const form = this.$refs['form-language-region']
      this.$store.dispatch('country/code', form.country())
      this.$router.push(this.localePath('/', form.language()))
    }
  }
}
</script>
