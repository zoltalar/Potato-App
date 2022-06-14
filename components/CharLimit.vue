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
    },
    ellipsis: {
      type: Boolean,
      required: false,
      default: false
    }
  },
  computed: {
    truncatedText() {
      const text = this.text
      const chars = this.chars
      const ellipsis = this.ellipsis
      if (!text) {
        return ''
      }
      if (text.length <= chars) {
        return text;
      }
      return text.substring(0, chars) + (ellipsis ? '...' : '')
    }
  }
}
</script>
