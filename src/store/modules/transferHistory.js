import Vue from 'vue'
import fetch from 'just-fetch'

const MUTATIONS = {
  SET_DATA: 'setData'
}
export default {
  namespaced: true,
  state: {
    data: []
  },
  mutations: {
    [MUTATIONS.SET_DATA] (state, payload) {
      Vue.set(state, 'data', payload)
    }
  },
  actions: {
    getAll ({ rootState, commit }) {
      fetch.get(`${process.env.VUE_APP_API_ENDPOINT}/data?access_token=${rootState.authorization.token}`)
        .then(data => {
          commit(MUTATIONS.SET_DATA, data)
        })
    }
  }
}
