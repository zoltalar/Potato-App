export const state = () => ({
  id: null,
  city: ''
})

export const mutations = {
  id (state, id) {
    state.id = id
  },
  city (state, city) {
    state.city = city
  }
}

export const actions = {
  id ({ commit }, id) {
    commit('id', id)
    this.$auth.$storage.setUniversal('potato._city_id', id)
  },
  city ({ commit }, city) {
    commit('city', city)
    this.$auth.$storage.setUniversal('potato._city_name', city)
  },
  async coords ({ commit }, coords) {
    let [ latitude, longitude ] = coords
    const uri = `/api/potato/cities/locate/${latitude}/${longitude}`
    const response = await this.$axios.get(uri)
    const city = this._vm.$_.get(response, 'data.city')
    if (!this._vm.$_.isEmpty(city)) {
      commit('id', city.id)
      commit('city', city.name)
    }
    return city
  }
}

export const getters = {
  id: (state) => {
    return state.id
  },
  city: (state) => {
    return state.city
  }
}
