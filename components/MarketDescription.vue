<template>
  <div class="description">
    <h6 class="mb-3">
      {{ $t('phrases.description') }}
      <nuxt-link :to="marketEditDescriptionLink(market)" class="link-edit" :title="$t('phrases.edit_description')" v-if="marketIsOwner(market)">
        <font-awesome-icon icon="pencil-alt" />
      </nuxt-link>
    </h6>
    <read-more-less :chars="550" :text="market.description" />
  </div>
</template>
<script>
export default {
  name: 'MarketDescription',
  props: {
    market: {
      type: Object,
      required: true
    }
  }
}
</script>
