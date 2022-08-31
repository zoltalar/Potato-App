<template>
  <b-card class="list-farm-item" v-if="farmNotEmpty(farm)">
    <font-awesome-icon icon="star" class="text-warning float-right" :title="$t('phrases.promoted')" v-if="farm.promote" />
    <nuxt-link :to="localePath({ name: 'farms-show-id-name', params: { id: farm.id, name: slugify(farm.name) } })" v-if="linkableImage && image && image.file">
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
      {{ farm.name }}
      <b-form-rating variant="warning" size="sm" class="p-0 ml-2" :value="farm.average_rating" no-border inline readonly />
    </b-card-title>
    <b-card-sub-title class="mb-2" v-if="address">{{ addressLine(address, ',', ['city', 'state']) }}</b-card-sub-title>
    <b-card-sub-title class="mb-2" v-else-if="farmIsNameable(farm)">{{ fullName(farm, true) }}</b-card-sub-title>
    <b-card-text v-if="farm.description">
      <char-limit :text="farm.description" :chars="160" :ellipsis="true" />
    </b-card-text>
    <b-badge variant="danger" class="float-right" v-if="!farmIsActive(farm)">{{ $t('phrases.inactive') }}</b-badge>
    <slot name="links"></slot>
  </b-card>
</template>
<script>
export default {
  name: 'FarmListItemCard',
  props: {
    farm: {
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
      const farm = this.farm
      return this.farmAddress(farm)
    },
    image () {
      const farm = this.farm
      return this.$_.head(this.$_.get(farm, 'images', []))
    }
  }
}
</script>
