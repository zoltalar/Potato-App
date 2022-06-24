<template>
  <span>
    <span v-html="truncatedText"></span>
    <a href="#more-less" @click.prevent="toggle">{{ $t('phrases.read_' + (all ? 'less' : 'more')) }}</a>
  </span>
</template>
<script>
export default {
  name: 'ReadMoreLess',
  props: ['text', 'chars'],
  computed: {
    truncatedText () {
      let text = this.text
      const chars = this.chars
      const all = this.all
      if (this.empty(text)) {
        return ''
      }
      text = this.nl2br(text)
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
