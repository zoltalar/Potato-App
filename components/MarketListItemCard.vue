<template>
  <b-card class="list-market-item" v-if="marketNotEmpty(market)">
    <font-awesome-icon icon="star" class="text-warning float-right" :title="$t('phrases.promoted')" v-if="market.promote" />
    <nuxt-link :to="localePath({ name: 'markets-show-id-name', params: { id: market.id, name: slugify(market.name) } })" v-if="linkableImage && image && image.file">
      <b-img-lazy
        :src="imageVariation(image.variations, 'primary', 'file_url')"
        :alt="image.title"
        class="img-primary" />
    </nuxt-link>
    <b-img-lazy
      :src="imageVariation(image.variations, 'primary', 'file_url')"
      :alt="image.title"
      class="img-primary"
      v-else-if="image && image.file" />
    <b-card-title class="h5">
      {{ market.name }}
      <b-form-rating variant="warning" size="sm" class="p-0 ml-2" :value="market.average_rating" no-border inline readonly />
    </b-card-title>
    <b-card-sub-title class="mb-2" v-if="address">{{ addressLine(address, ',', ['city', 'state']) }}</b-card-sub-title>
    <b-card-sub-title class="mb-2" v-else-if="marketIsNameable(market)">{{ fullName(market, true) }}</b-card-sub-title>
    <b-card-text v-if="market.description">
      <char-limit :text="market.description" :chars="160" :ellipsis="true" />
    </b-card-text>
    <b-badge variant="danger" class="float-right" v-if="!marketIsActive(market)">{{ $t('phrases.inactive') }}</b-badge>
    <slot name="links"></slot>
  </b-card>
</template>
<script>
export default {
  name: 'MarketListItemCard',
  props: {
    market: {
      type: Object,
      required: true
    },
    linkableImage: {
      type: Boolean,
      required: false,
      default: false
    }
  },
  computed: {
    address () {
      const market = this.market
      return this.marketAddress(market)
    },
    image () {
      const market = this.market
      return this.$_.head(this.$_.get(market, 'images', []))
    }
  }
}
</script>
