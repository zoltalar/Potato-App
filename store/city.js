export const state = () => ({
  city: null
})

export const mutations = {
  city (state, city) {
    state.city = city
  }
}

export const actions = {
  city ({ commit }, city) {
    commit('city', city)
    this.$auth.$storage.setCookie('potato._city', city)
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
  }
}
