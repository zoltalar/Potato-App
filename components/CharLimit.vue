<template>
  <span>{{ truncatedText }}</span>
</template>
<script>
export default {
  name: 'CharLimit',
  props: {
    text: {
      type: String,
      required: true
    },
    chars: {
      type: Number,
      required: true
    }
  },
  computed: {
    truncatedText() {
      const text = this.text
      const chars = this.chars
      if ( ! text) {
        return ''
      }
      if (text.length <= chars) {
        return text;
      }
      return text.substring(0, chars) + '...'
    }
  }
}
</script>
