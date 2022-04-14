<template>
  <header class="site-header">
    <b-container>
      <b-navbar class="navbar-primary" toggleable="lg">
        <nuxt-link to="/" class="navbar-brand">
          {{ $t('messages.codename') }}
        </nuxt-link>
        <b-navbar-toggle target="nav-primary-collapse"></b-navbar-toggle>
        <b-collapse id="nav-primary-collapse" is-nav>
          <b-navbar-nav class="ml-auto">
            <b-nav-item href="#">{{ $t('phrases.register') }}</b-nav-item>
            <b-nav-item href="#">{{ $t('phrases.login') }}</b-nav-item>
          </b-navbar-nav>
        </b-collapse>
      </b-navbar>
    </b-container>
  </header>
</template>
<script>
export default {
  name: 'TheHeader'
}
</script>
