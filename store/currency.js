export const state = () => ({
  code: 'PLN',
  collection: []
})

export const mutations = {
  code (state, code) {
    state.code = code
  },
  collection (state, collection) {
    state.collection = collection
  }
}

export const actions = {
  async code ({ commit }, code) {
    if (this.$auth.loggedIn) {
      await this.$axios.put('/api/potato/users/update-currency', { code })
    }
    commit('code', code)
    return code
  },
  async collection ({ commit }) {
    const response = await this.$axios.get('/api/potato/currencies/index', {
      params: { all: true }
    })
    const collection = this._vm.$_.get(response, 'data.data')
    commit('collection', collection)
    return collection
  }
}

export const getters = {
  code: (state) => {
    return state.code
  },
  collection: (state) => {
    return state.collection
  }
}
