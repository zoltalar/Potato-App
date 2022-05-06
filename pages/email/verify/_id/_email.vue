<template>
  <div class="authentication verify">
    <page-title>
      {{ $t('phrases.verify_your_email_address') }}
    </page-title>
    <page-content>
      <p>{{ $t('phrases.verifying') }}...</p>
    </page-content>
  </div>
</template>
<script>
export default {
  name: 'PageEmailVerify',
  middleware: ['auth'],
  layout: 'default',
  watch: {
    '$route': {
      handler() {
        console.log(this.$route.params.id)
        console.log(this.$route.params.email)
      },
      immediate: true
    }
  }
}
</script>
