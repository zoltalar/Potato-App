<template>
  <div class="authentication register">
    <page-title>
      {{ $t('phrases.register') }}
    </page-title>
    <page-content-aside>
      <template>
        <register-form />
      </template>
      <template v-slot:aside>
        <span class="circle">
          <font-awesome-icon icon="list" />
        </span>
        <h4>{{ $t('phrases.why_register?') }}</h4>
        <div class="list">
          <div class="list-item" v-for="(reason, i) in reasons()">
            <span class="circle circle-light-gray">
              {{ (i + 1) }}
            </span>
            <div class="list-item-center">
              <p>{{ reason.text }}</p>
            </div>
          </div>
        </div>
      </template>
    </page-content-aside>
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
  },
  methods: {
    reasons() {
      return [
        { text: this.$t('messages.why_register_reason_1') },
        { text: this.$t('messages.why_register_reason_2') },
        { text: this.$t('messages.why_register_reason_3') }
      ]
    }
  }
}
</script>
