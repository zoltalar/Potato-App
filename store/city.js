export const state = () => ({
  city: null,
  largestCollection: []
})

export const mutations = {
  city (state, city) {
    state.city = city
  },
  largestCollection (state, collection) {
    state.largestCollection = collection
  }
}

export const actions = {
  city ({ commit }, city) {
    commit('city', city)
    this.$auth.$storage.setCookie('potato._city', city)
  },
  async largestCollection ({ commit }) {
    const response = await this.$axios.get('/api/potato/cities/index', { params: {
      population: 200000,
      order_by: 'population',
      direction: 'desc',
      limit: 25
    }})
    const cities = this._vm.$_.get(response, 'data.data', [])
    commit('largestCollection', cities)
    return cities
  },
  async locate ({ commit }, coords) {
    let [ latitude, longitude ] = coords
    const uri = `/api/potato/cities/locate/${latitude}/${longitude}`
    const response = await this.$axios.get(uri)
    const cities = this._vm.$_.get(response, 'data.data', [])
    let city = null
    if (cities.length > 0) {
      city = this._vm.$_.head(cities)
      commit('city', city)
    }
    return city
  }
}

export const getters = {
  city: (state) => {
    return state.city
  },
  largestCollection: (state) => {
    return state.largestCollection
  }
}
