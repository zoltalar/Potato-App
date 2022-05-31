export const state = () => ({
  error: '',
  message: ''
})

export const mutations = {
  error (state, error) {
    state.error = error
  },
  message (state, message) {
    state.message = message
  }
}

export const actions = {
  error ({ commit }, error) {
    commit('error', error)
  },
  message ({ commit }, message) {
    commit('message', message)
  }
}

export const getters = {
  error: (state) => {
    return state.error
  },
  message: (state) => {
    return state.message
  }
}
