<template>
  <div class="page-cover" :style="style">
    <nuxt-link :to="editLink()" class="link-edit" :title="$t('phrases.edit_cover')" v-if="farmIsOwner(imageable)">
      <font-awesome-icon icon="pencil-alt" />
    </nuxt-link>
  </div>
</template>
<script>
export default {
  name: 'PageCover',
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
    cover () {
      const images = this.images
      return this.$_.head(this.$_.filter(images, (image) => {
        return parseInt(image.cover) === 1
      }))
    },
    images () {
      const imageable = this.imageable
      return this.$_.get(imageable, 'images', [])
    },
    style () {
      const cover = this.cover
      const variations = this.$_.get(cover, 'variations', [])
      const image = this.imageVariation(variations, 'cover', 'file_url')
      if (!this.$_.isNil(image)) {
        return {
          'background-image': 'url("' + image + '")'
        }
      }
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
