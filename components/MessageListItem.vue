<template>
  <li :class="{'unread': messageIsUnread(message)}">
    <div class="col-mail col-mail-1">
      <div class="checkbox-wrap">
        <b-checkbox name="messages[]" v-model="toggle" />
      </div>
      <nuxt-link :to="messageViewLink(message)" class="title">{{ fullName(message.sender, true) }}</nuxt-link>
    </div>
    <div class="col-mail col-mail-2">
      <nuxt-link :to="messageViewLink(message)" class="subject">
        {{ message.subject }}
        -
        <char-limit :chars="100" :text="message.content" class="teaser" />
      </nuxt-link>
      <span class="date" v-if="dateIsSame(message.created_at)">{{ shortTime(message.created_at) }}</span>
      <span class="date" v-else>{{ shortDate(message.created_at) }}</span>
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
  data: () => ({
    toggle: false
  }),
  watch: {
    toggle: {
      handler (toggle) {
        const message = this.message
        this.$root.$emit('toggle-message', { toggle, id: message.id })
      }
    }
  },
  methods: {
    listen () {
      this.$root.$on('toggle-messages', ({toggle}) => {
        this.toggle = toggle
      })
    }
  },
  mounted () {
    this.listen()
  }
}
</script>
