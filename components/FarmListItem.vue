<template>
  <div class="list-item">
    <nuxt-link :to="localePath({ name: 'farms-show-name-id', params: { name: slugify(farm.name), id: farm.id } })" v-if="image">
      <img :src="image" class="img-list-item" />
    </nuxt-link>
    <nuxt-link :to="localePath({ name: 'farms-show-name-id', params: { name: slugify(farm.name), id: farm.id } })" class="link-name">{{ farm.name }}</nuxt-link>
    <b-form-rating variant="warning" size="sm" class="p-0 ml-2" :value="farm.average_rating" no-border inline readonly />
    <p>
      <char-limit :chars="charLimit" :text="farm.description" :ellipsis="true" />
      <distance-away :distance="addressableDistanceAway(farm)" v-if="distanceAway && addressableDistanceAway(farm) !== null" />
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
    },
    charLimit: {
      type: Number,
      required: false,
      default: 70
    },
    distanceAway: {
      type: Boolean,
      required: false,
      default: false
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
