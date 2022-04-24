<template>
  <div class="authentication register">
    <page-title>
      {{ $t('phrases.register') }}
    </page-title>
    <page-content>
      <b-row>
        <b-col md="6">
          <register-form />
        </b-col>
        <b-col md="6">
          2
        </b-col>
      </b-row>
    </page-content>
  </div>
</template>
<script>
export default {
  name: 'PageRegister',
  layout: 'default',
  nuxtI18n: {
    locales: ['en', 'pl'],
    paths: {
      en: '/register',
      pl: '/rejestracja'
    }
  }
}
</script>
