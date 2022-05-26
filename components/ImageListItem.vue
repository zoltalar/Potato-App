<template>
  <b-card class="mb-4" :img-src="image.file_url" v-if="image">
    <b-card-text>
      <b-dropdown class="float-right" variant="light" size="sm">
        <b-dropdown-item @click.prevent="edit(image)">{{ $t('phrases.edit') }}</b-dropdown-item>
        <b-dropdown-item @click.prevent="destroy(image)">{{ $t('phrases.delete') }}</b-dropdown-item>
        <b-dropdown-item>{{ $t('phrases.set_as_cover_image') }}</b-dropdown-item>
        <b-dropdown-item>{{ $t('phrases.set_as_main') }}</b-dropdown-item>
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
    },
    imageable: {
      type: Object,
      required: true
    },
    type: {
      type: String,
      required: true
    }
  },
  methods: {
    destroy (image) {
      const type = this.type
      const model = this.$t('phrases.photo').toLowerCase()
      const message = this.$t('messages.confirm_model_destroy', { model })
      if (confirm(message)) {
        this
          .$axios
          .delete(this.uri())
          .then((response) => {
            if (response.status === 204) {
              this.$root.$emit(type + '-image-deleted')
            }
          })
      }
    },
    edit (image) {
      const type = this.type
      this.$root.$emit(type + '-image-edit', { image })
    },
    uri () {
      const image = this.image
      const imageable = this.imageable
      const type = this.type
      return `/api/potato/images/${image.id}/${type}/${imageable.id}`
    }
  }
}
</script>
