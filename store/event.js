export const state = () => ({
  meta: {}
})

export const mutations = {
  meta (state, meta) {
    state.meta = meta
  }
}

export const actions = {
  async meta ({ commit }) {
    const response = await this.$axios.get('/api/potato/events/meta')
    const meta = this._vm.$_.get(response, 'data')
    commit('meta', meta)
    return meta
  }
}

export const getters = {
  meta: (state) => {
    return state.meta
  }
}
