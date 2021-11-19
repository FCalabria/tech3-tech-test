import { createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'

import authorization from '../../../../src/store/modules/authorization'

describe('Authorization module', () => {
  test('It should set the auth token on the state', () => {
    const localVue = createLocalVue()
    localVue.use(Vuex)
    const store = new Vuex.Store({
      modules: { authorization }
    })

    expect(store.state.authorization).toHaveProperty('token')
    expect(typeof store.state.authorization.token).toEqual('string')
  })
})