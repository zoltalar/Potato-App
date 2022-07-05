<template>
  <div class="autocomplete-input">
    <b-form-input
      :size="size"
      maxlength="255"
      :placeholder="$t('messages.search_product_with_example')"
      required
      @input="onChange"
      @keyup="onKeyUp"
      v-model="item" />
    <ul v-if="hasInventory() && open">
      <li v-for="(item, i) in inventory" :key="'autocomplete-inventory-' + i" @click.prevent="select(item)">
        <span>{{ inventoryName(item) }}</span>
      </li>
    </ul>
  </div>
</template>
<script>
export default {
  name: 'AutocompleteInventoryInput',
  props: {
    value: {
      type: String,
      default: null
    },
    size: {
      type: String,
      default: 'lg'
    }
  },
  data: () => ({
    item: '',
    inventory: [],
    open: false,
    timeout: null
  }),
  watch: {
    value: {
      handler (value) {
        this.item = value
      },
      immediate: true
    }
  },
  methods: {
    clickOutside (event) {
      if ( ! this.$el.contains(event.target)) {
        this.open = false
      }
    },
    fetchInventory () {
      const item = this.item
      if (item.length >= 2) {
        this
          .$axios
          .get('/api/potato/inventory/index', {
            params: {
              search: item
            }
          })
          .then((response) => {
            let inventory = this.$_.get(response, 'data.data', [])
            if (inventory.length > 5) {
              inventory = this.$_.slice(inventory, 0, 5)
            }
            this.inventory = inventory
          })
      } else {
        this.inventory = []
      }
    },
    hasInventory () {
      return this.inventory.length > 0
    },
    onChange () {
      if (this.timeout) {
        clearTimeout(this.timeout)
        this.timeout = null
      }

      this.timeout = setTimeout(() => {
        this.fetchInventory()
        this.open = true
      }, 400)
    },
    onKeyUp () {
      const item = {
        id: 0,
        name: this.item
      }
      this.$root.$emit('autocomplete-inventory-input', { item })
    },
    select (item) {
      this.item = this.inventoryName(item)
      this.open = false
      this.$root.$emit('autocomplete-inventory-input', { item })
    }
  },
  mounted () {
    document.addEventListener('click', this.clickOutside)
  },
  destroyed () {
    document.removeEventListener('click', this.clickOutside)
  }
}
</script>
