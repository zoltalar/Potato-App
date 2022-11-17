<template>
  <div class="account events">
    <page-title>
      {{ $t('phrases.events') }}
    </page-title>
    <page-aside-content>
      <template v-slot:aside>
        <my-account-menu class="mb-4" />
      </template>
    </page-aside-content>
  </div>
</template>
<script>
export default {
  name: 'PageAccountEvents',
  middleware: ['auth'],
  layout: 'default',
  head () {
    return {
      title: this.$t('phrases.events'),
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: this.$t('messages.meta_description_my_account_events')
        }
      ],
    }
  },
}
</script>
