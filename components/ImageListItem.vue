<template>
  <b-card :img-src="image.file_url" v-if="image">
    <b-card-text>
      <b-dropdown class="float-right" variant="light" size="sm">
        <b-dropdown-item @click.prevent="destroy(image)">{{ $t('phrases.delete') }}</b-dropdown-item>
      </b-dropdown>
      {{ image.title }}
    </b-card-text>
  </b-card>
</template>
<script>
export default {
  name: 'ImageListItem',
  props: {
    image: {
      type: Object,
      required: true
    }
  },
  methods: {
    destroy(image) {
      const model = this.$t('phrases.photo').toLowerCase()
      const message = this.$t('messages.confirm_model_destroy', { model })
      if (confirm(message)) {
        alert('ok')
      }
    }
  }
}
</script>
