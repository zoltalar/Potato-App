<template>
  <li :class="{'unread': messageIsUnread(message)}" @click="read">
    <div class="col-mail col-mail-1">
      <div class="checkbox-wrap">
        <b-checkbox />
      </div>
      <nuxt-link :to="messageViewLink(message)" class="title">{{ fullName(message.sender, true) }}</nuxt-link>
    </div>
    <div class="col-mail col-mail-2">
      <nuxt-link :to="messageViewLink(message)" class="subject">
        {{ message.subject }}
        <char-limit :chars="100" :text="message.content" class="teaser" />
      </nuxt-link>
      <span class="date">{{ shortDate(message.created_at) }}</span>
    </div>
  </li>
</template>
<script>
export default {
  name: 'MessageListItem',
  props: {
    message: {
      type: Object,
      required: true
    }
  },
  methods: {
    read() {
      const message = this.message
      this.$root.$emit('message-read', { message })
    }
  }
}
</script>
