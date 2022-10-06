<template>
  <div class="products">
    <h2 class="h6 mb-3">
      {{ $t('phrases.products') }}
      <nuxt-link :to="farmEditProductsLink(productable)" class="link-edit" :title="$t('phrases.edit_products')" v-if="type === 'farm' && farmIsOwner(productable)">
        <font-awesome-icon icon="pencil-alt" />
      </nuxt-link>
      <nuxt-link :to="marketEditProductsLink(productable)" class="link-edit" :title="$t('phrases.edit_products')" v-else-if="type === 'market' && marketIsOwner(productable)">
        <font-awesome-icon icon="pencil-alt" />
      </nuxt-link>
    </h2>
    <b-tabs v-if="hasInventory()">
      <b-tab :title="$t('phrases.' + season)" :active="currentSeason() === season" v-for="(season, i) in seasons()" :key="'inventory-tab-' + i">
        <div v-if="inventory[season]">
          <div class="category-inventory" v-for="(inventoryNames, categoryName) in inventory[season]">
            <h6>{{ categoryName }}</h6>
            <ul>
              <li v-for="(inventoryName) in inventoryNames">
                {{ inventoryName }}
              </li>
            </ul>
          </div>
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
