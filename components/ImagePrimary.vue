<template>
  <div class="image-primary" v-if="image">
    <img :src="image" :alt="primary.title || imageable.name">
    <nuxt-link :to="editLink()" class="link-edit" :title="$t('phrases.edit_primary_photo')" v-if="farmIsOwner(imageable)">
      <font-awesome-icon icon="pencil-alt" />
    </nuxt-link>
  </div>
</template>
<script>
export default {
  name: 'ImagePrimary',
  props: {
    imageable: {
      type: Object,
      required: true
    },
    type: {
      type: String,
      required: true
    }
  },
  computed: {
    image () {
      const primary = this.primary
      const variations = this.$_.get(primary, 'variations', [])
      return this.imageVariation(variations, 'primary', 'file_url')
    },
    images () {
      const imageable = this.imageable
      return this.$_.get(imageable, 'images', [])
    },
    primary () {
      const images = this.images
      return this.$_.head(this.$_.filter(images, (image) => {
        return parseInt(image.primary) === 1
      }))
    }
  },
  methods: {
    editLink () {
      const imageable = this.imageable
      const type = this.type
      if (type === 'farm') {
        return this.farmEditPhotosLink(imageable)
      }
    }
  }
}
</script>
