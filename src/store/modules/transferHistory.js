import Vue from 'vue'
import fetch from 'just-fetch'

const MUTATIONS = {
  SET_DATA: 'setData',
  SET_ERROR: 'setError',
  SET_LOADING: 'setLoading',
}
export default {
  namespaced: true,
  state: {
    data: [],
    error: '',
    loading: false
  },
  mutations: {
    [MUTATIONS.SET_DATA] (state, payload) {
      Vue.set(state, 'data', payload)
    },
    [MUTATIONS.SET_ERROR] (state, payload) {
      if (payload.message) {
        state.error = payload.message
      } else {
        state.error = payload
      }
    },
    [MUTATIONS.SET_LOADING] (state, payload) {
      state.loading = payload
    },
  },
  actions: {
    getAll ({ rootState, commit }) {
      commit(MUTATIONS.SET_ERROR, '')
      commit(MUTATIONS.SET_LOADING, true)
      fetch.get(`${process.env.VUE_APP_API_ENDPOINT}/data?access_token=${rootState.authorization.token}`)
        .then(data => {
          commit(MUTATIONS.SET_DATA, data)
        })
        .catch(error => {
          commit(MUTATIONS.SET_DATA, [])
          commit(MUTATIONS.SET_ERROR, error)
        })
        .finally(() => {
          commit(MUTATIONS.SET_LOADING, false)
        })
    }
  }
}
