export const state = () => ({
  message: ''
})

export const mutations = {
  message (state, message) {
    state.message = message
  }
}

export const actions = {
  message ({ commit }, message) {
    commit('message', message)
  }
}

export const getters = {
  message: (state) => {
    return state.message
  }
}
