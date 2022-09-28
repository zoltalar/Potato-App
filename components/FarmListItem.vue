<template>
  <div class="list-item">
    <nuxt-link :to="localePath({ name: 'farms-show-id-name', params: { id: farm.id, name: slugify(farm.name) } })" v-if="image">
      <img :src="image" class="img-list-item" />
    </nuxt-link>
    <nuxt-link :to="localePath({ name: 'farms-show-id-name', params: { id: farm.id, name: slugify(farm.name) } })" class="link-name">{{ farm.name }}</nuxt-link>
    <b-form-rating variant="warning" size="sm" class="p-0 ml-2" :value="farm.average_rating" no-border inline readonly />
    <p>
      <char-limit :chars="70" :text="farm.description" :ellipsis="true" />
      <distance-away :distance="addressableDistanceAway(farm)" class="small ml-2" />
    </p>
  </div>
</template>
<script>
export default {
  name: 'FarmListItem',
  props: {
    farm: {
      type: Object,
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
      const farm = this.farm
      return this.$_.get(farm, 'images', [])
    },
    primary () {
      const images = this.images
      return this.primaryImage(images)
    }
  }
}
</script>
