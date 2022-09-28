export const state = () => ({
  type: 'farms'
})

export const mutations = {
  type (state, type) {
    state.type = type
  }
}

export const actions = {
  type ({ commit }, type) {
    commit('type', type)
    this.$auth.$storage.setCookie('potato.search._type', type)
  }
}

export const getters = {
  type: (state) => {
    return state.type
  }
}
