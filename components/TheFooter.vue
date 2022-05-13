<template>
  <footer class="site-footer">
    <b-container>
      <b-row>
        <b-col sm="6">
          {{ $t('messages.copyrights_text', { year: (new Date()).getFullYear() }) }}
        </b-col>
        <b-col sm="6">
          <ul class="footer-nav">
            <li>
              <nuxt-link :to="localePath('/')">{{ $t('phrases.home_page') }}</nuxt-link>
            </li>
            <li>
              <nuxt-link :to="localePath('/contact')">{{ $t('phrases.contact_us') }}</nuxt-link>
            </li>
          </ul>
        </b-col>
      </b-row>
    </b-container>
  </footer>
</template>
<script>
export default {
  name: 'TheFooter'
}
</script>
