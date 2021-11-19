import Vue from 'vue'
import Vuex from 'vuex'

import transferHistory from './modules/transferHistory'
import authorization from './modules/authorization'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    transferHistory,
    authorization
  }
})
