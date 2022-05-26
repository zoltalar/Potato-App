<template>
  <b-card class="list-farm-item" v-if="farm">
    <font-awesome-icon icon="star" class="text-warning float-right" :title="$t('phrases.promoted')" v-if="farm.promote" />
    <b-img-lazy
      :src="imageVariation(image.variations, 'primary', 'file_url')"
      :alt="image.title"
      class="img-primary"
      v-if="image && image.file" />
    <b-card-title class="h5">{{ farm.name }}</b-card-title>
    <b-card-sub-title class="mb-2" v-if="farmIsNameable(farm)">{{ fullName(farm, true) }}</b-card-sub-title>
    <b-card-text v-if="farm.description">
      <char-limit :text="farm.description" :chars="170" />
    </b-card-text>
    <slot name="links"></slot>
  </b-card>
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
      const farm = this.farm
      return this.$_.head(this.$_.get(farm, 'images', []))
    }
  }
}
</script>
