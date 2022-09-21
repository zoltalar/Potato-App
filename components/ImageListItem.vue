<template>
  <b-card class="mb-4" :img-src="image.file_url" v-if="image">
    <b-card-text>
      <b-dropdown class="float-right" variant="light" size="sm">
        <b-dropdown-item @click.prevent="edit()">{{ $t('phrases.edit') }}</b-dropdown-item>
        <b-dropdown-item @click.prevent="destroy()">{{ $t('phrases.delete') }}</b-dropdown-item>
        <b-dropdown-item @click.prevent="setCover()" v-if="!imageIsCover(image)">{{ $t('phrases.set_as_cover_image') }}</b-dropdown-item>
        <b-dropdown-item @click.prevent="setPrimary()" v-if="!imageIsPrimary(image)">{{ $t('phrases.set_as_main') }}</b-dropdown-item>
      </b-dropdown>
      {{ image.title }}
      <small class="text-muted ml-1">{{ filesize(image) }} kB</small>
      <small v-if="imageIsCover(image)">{{ $t('phrases.currently_set_as_cover_image') }}</small>
      <small class="d-block" v-if="imageIsPrimary(image)">{{ $t('phrases.currently_set_as_primary_image') }}</small>
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
    destroy () {
      const type = this.type
      const model = this.$t('phrases.photo').toLowerCase()
      const message = this.$t('messages.confirm_model_destroy', { model })
      if (confirm(message)) {
        this
          .$axios
          .delete(this.destroyUri())
          .then((response) => {
            if (response.status === 204) {
              this.$root.$emit(type + '-image-deleted')
            }
          })
      }
    },
    destroyUri () {
      const image = this.image
      const imageable = this.imageable
      const type = this.type
      return `/api/potato/images/${image.id}/${type}/${imageable.id}`
    },
    edit () {
      const image = this.image
      const type = this.type
      this.$root.$emit(type + '-image-edit', { image })
    },
    setCover () {
      const type = this.type
      const message = this.$t('messages.confirm_image_cover')
      if (confirm(message)) {
        this
          .$axios
          .put(this.updateCoverUri())
          .then((response) => {
            const image = this.$_.get(response, 'data.data')
            if (!this.$_.isEmpty(image)) {
              this.$root.$emit(type + '-image-updated')
            }
          })
      }
    },
    setPrimary () {
      const type = this.type
      const message = this.$t('messages.confirm_image_primary')
      if (confirm(message)) {
        this
          .$axios
          .put(this.updatePrimaryUri())
          .then((response) => {
            const image = this.$_.get(response, 'data.data')
            if (!this.$_.isEmpty(image)) {
              this.$root.$emit(type + '-image-updated')
            }
          })
      }
    },
    updateCoverUri () {
      const image = this.image
      const imageable = this.imageable
      const type = this.type
      return `/api/potato/images/update-cover/${image.id}/${type}/${imageable.id}`
    },
    updatePrimaryUri () {
      const image = this.image
      const imageable = this.imageable
      const type = this.type
      return `/api/potato/images/update-primary/${image.id}/${type}/${imageable.id}`
    }
  }
}
</script>
