<template>
  <div class="list-item">
    <nuxt-link :to="localePath({ name: 'markets-show-id-name', params: { id: market.id, name: slugify(market.name) } })" v-if="image">
      <img :src="image" class="img-list-item" />
    </nuxt-link>
    <nuxt-link :to="localePath({ name: 'markets-show-id-name', params: { id: market.id, name: slugify(market.name) } })" class="link-name">{{ market.name }}</nuxt-link>
    <b-form-rating variant="warning" size="sm" class="p-0 ml-2" :value="market.average_rating" no-border inline readonly />
    <p>
      <char-limit :chars="70" :text="market.description" :ellipsis="true" />
      <distance-away :distance="addressableDistanceAway(market)" class="small ml-2" />
    </p>
  </div>
</template>
<script>
export default {
  name: 'MarketListItem',
  props: {
    market: {
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
      const market = this.market
      return this.$_.get(market, 'images', [])
    },
    primary () {
      const images = this.images
      return this.primaryImage(images)
    }
  }
}
</script>
