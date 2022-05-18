export const state = () => ({
  code: 'pl',
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
      await this.$axios.put('/api/potato/users/update-language', { code })
    }
    commit('code', code)
  },
  async collection ({ commit }) {
    const response = await this.$axios.get('/api/potato/languages/index', {
      params: { all: true }
    })
    const collection = this._vm._.get(response, 'data.data')
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
