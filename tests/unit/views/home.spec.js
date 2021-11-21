import { createLocalVue, shallowMount } from '@vue/test-utils'
import Vuex from 'vuex'
import Home from '@/views/Home.vue'
describe('Home view', () => {
  let localVue, store
  const mockStore = {
    modules: {
      transferHistory: {
        namespaced: true,
        state: {
          loading: false,
          data: []
        },
        actions: {
          getAll: jest.fn()
        }
      }
    }
  }
  const $route = {
    params: {}
  }
  beforeEach(() => {
    localVue = createLocalVue()
    localVue.use(Vuex)
    store = new Vuex.Store(mockStore)
    shallowMount(Home, {
      localVue,
      store,
      mocks: {
        $route
      }
    })
  })
  test('it should fetch the transfer history on load', () => {
    expect(mockStore.modules.transferHistory.actions.getAll).toHaveBeenCalled()
  })
})