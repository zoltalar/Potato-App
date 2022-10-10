export const state = () => ({
  type: null,
  inventory: {},
  city: {},
  search: []
})

export const mutations = {
  type (state, type) {
    state.type = type
  },
  inventory (state, item) {
    state.inventory = item
  },
  city (state, city) {
    state.city = city
  },
  search (state, search) {
    state.search = search
  }
}

export const actions = {
  type ({ commit }, type) {
    commit('type', type)
    this.$auth.$storage.setCookie('potato.search._type', type)
  },
  async inventory({ commit }, { inventoryId, itemName }) {
    let item = {}
    let response = null
    if (parseInt(inventoryId) > 0) {
      response = await this.$axios.get('/api/potato/inventory/index', {
        params: { inventory_id: inventoryId }
      })
    } else if (itemName) {
      response = await this.$axios.get('/api/potato/inventory/index', {
        params: { search: this._vm.unslugify(itemName) }
      })
    }
    if (response) {
      const inventory = this._vm.$_.get(response, 'data.data')
      item = this._vm.$_.head(inventory)
    }
    commit('inventory', item)
    return item
  },
  async city({ commit }, { cityId, location }) {
    let city = {}
    let response = null
    if (parseInt(cityId) > 0) {
      response = await this.$axios.get('/api/potato/cities/index', {
        params: { city_id: cityId }
      })
    } else if (location) {
      response = await this.$axios.get('/api/potato/cities/index', {
        params: { search: this._vm.unslugify(location) }
      })
    }
    if (response) {
      const inventory = this._vm.$_.get(response, 'data.data')
      city = this._vm.$_.head(inventory)
    }
    commit('city', city)
    return city
  },
  async search ({ commit }, { type, item, inventoryId, location, cityId, radius, page }) {
    const response = await this.$axios.get(`/api/potato/${type}/search`, { params: {
      item: this._vm.unslugify(item),
      inventory_id: inventoryId,
      location,
      city_id: cityId,
      radius,
      page
    }})
    const search = response.data.data
    const meta = response.data.meta
    commit('search', search)
    return { search, meta }
  }
}

export const getters = {
  type: (state) => {
    return state.type
  },
  inventory: (state) => {
    return state.inventory
  },
  city: (state) => {
    return state.city
  },
  search: (state) => {
    return state.search
  }
}
