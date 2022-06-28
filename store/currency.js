export const state = () => ({
  collection: []
})

export const mutations = {
  collection (state, collection) {
    state.collection = collection
  }
}

export const actions = {
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
  collection: (state) => {
    return state.collection
  }
}
