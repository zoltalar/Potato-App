<template>
  <span>
    <span v-html="truncatedText"></span>
    <a href="#more-less" @click.prevent="toggle">{{ $t('phrases.read_' + (all ? 'less' : 'more')) }}</a>
  </span>
</template>
<script>
export default {
  name: 'ReadMoreLess',
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
    truncatedText () {
      const text = this.nl2br(this.text)
      const chars = this.chars
      const all = this.all
      if (!text) {
        return ''
      }
      if (text.length <= chars || all) {
        return text;
      }
      return text.substring(0, chars) + '...'
    }
  },
  data: () => ({
    all: false
  }),
  methods: {
    toggle () {
      this.all = !this.all
    }
  }
}
</script>
