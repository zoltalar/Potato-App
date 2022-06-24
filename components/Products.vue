<template>
  <div class="products">
    <h6 class="mb-3">
      {{ $t('phrases.products') }}
      <nuxt-link :to="farmEditProductsLink(productable)" class="link-edit" :title="$t('phrases.edit_products')" v-if="type === 'farm' && farmIsOwner(productable)">
        <font-awesome-icon icon="pencil-alt" />
      </nuxt-link>
    </h6>
    <b-tabs v-if="hasInventory()">
      <b-tab :title="$t('phrases.' + season)" :active="currentSeason() === season" v-for="(categories, season) in inventory">
        <div class="category-inventory" v-for="(inventoryNames, categoryName) in categories">
          <h6>{{ categoryName }}</h6>
          <ul>
            <li v-for="(inventoryName) in inventoryNames">
              {{ inventoryName }}
            </li>
          </ul>
        </div>
      </b-tab>
    </b-tabs>
    <p v-else>{{ $t('phrases.no_product_information') }}.</p>
  </div>
</template>
<script>
export default {
  name: 'Products',
  props: {
    productable: {
      type: Object,
      required: true
    },
    type: {
      type: String,
      required: true
    }
  },
  computed: {
    inventory () {
      const productable = this.productable
      return this.productInventory(productable.products)
    }
  },
  methods: {
    hasInventory () {
      const inventory = this.inventory
      return !this.$_.isEmpty(inventory)
    }
  }
}
</script>
