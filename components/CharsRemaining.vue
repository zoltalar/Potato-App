<template>
  <span>{{ $t('messages.characters_remaining', { remaining }) }}</span>
</template>
<script>
export default {
  name: 'CharsRemaining',
  props: ['for'],
  data: () => ({
    value: '',
    max: 0
  }),
  computed: {
    remaining () {
      return this.max - this.value.length
    }
  },
  methods: {
    bind () {
      const input = document.getElementById(this.for)
      this.max = parseInt(input.getAttribute('maxlength'))
      input.removeEventListener('keyup', (event) => {})
      input.removeEventListener('paste', (event) => {})
      input.addEventListener('keyup', (event) => {
        this.value = event.target.value
      })
      input.addEventListener('paste', (event) => {
        this.value = event.target.value
      })
      input.dispatchEvent(new KeyboardEvent('keyup'))
    },
    update (value) {
      this.value = (this.$_.isNil(value) ? '' : value)
    }
  },
  mounted () {
    this.bind()
  }
}
</script>
