<template>
  <div class="image-primary" v-if="image">
    <img :src="image" :alt="alt">
    <div class="overlay" @click.prevent="gallery" v-if="hasImages()">
      {{ $t('phrases.view_photo_gallery') }}
      ({{ images.length }})
    </div>
    <nuxt-link :to="editLink()" class="link-edit" :title="$t('phrases.edit_primary_photo')" v-if="(type === 'farm' && farmIsOwner(imageable)) || (type === 'market' && marketIsOwner(imageable))">
      <font-awesome-icon icon="pencil-alt" />
    </nuxt-link>
    <b-modal id="modal-photo-gallery-view" size="xl" :title="$t('phrases.photo_gallery')" hide-footer no-enforce-focus>
      <b-carousel id="farm-photo-gallery" fade controls indicators>
        <b-carousel-slide :caption="image.title" :img-src="image.file_url" :key="'carousel-image-' + i" v-for="(image, i) in images"></b-carousel-slide>
      </b-carousel>
    </b-modal>
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
    alt () {
      const imageable = this.imageable
      const primary = this.primary
      let alt = imageable.name
      if (!this.$_.isEmpty(primary)) {
        alt = primary.title
      }
      return alt
    },
    image () {
      const primary = this.primary
      const variations = this.$_.get(primary, 'variations', [])
      let image = this.imageVariation(variations, 'primary', 'file_url')
      if (this.empty(image)) {
        image = require(`@/assets/images/blank.png`)
      }
      return image
    },
    images () {
      const imageable = this.imageable
      return this.$_.get(imageable, 'images', [])
    },
    primary () {
      const images = this.images
      return this.primaryImage(images)
    }
  },
  methods: {
    editLink () {
      const imageable = this.imageable
      const type = this.type
      if (type === 'farm') {
        return this.farmEditPhotosLink(imageable)
      } else if (type === 'market') {
        return this.marketEditPhotosLink(imageable)
      }
    },
    gallery () {
      this.$bvModal.show('modal-photo-gallery-view')
    },
    hasImages () {
      return this.images.length > 0
    }
  }
}
</script>
