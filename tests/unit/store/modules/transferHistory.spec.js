import { createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'
import fetch from 'just-fetch'

import transferHistory from '../../../../src/store/modules/transferHistory'

describe('Transfer History module', () => {
  let localVue, store
  let mockToken = '1234token'
  beforeAll(() => {
    localVue = createLocalVue()
    localVue.use(Vuex)
  })
  afterAll(() => {
    jest.unmock('just-fetch')
  })
  beforeEach(() => {
    store = new Vuex.Store({
      modules: {
        authorization: {
          namespaced: true,
          state: { token: mockToken }
        },
        transferHistory
      }
    })
  })
  describe('getAll', () => {
    test('It should call the data endpoint with the correct params', async () => {
      await store.dispatch('transferHistory/getAll')
      expect(fetch.get).toHaveBeenCalledTimes(1)
      expect(fetch.get).toHaveBeenCalledWith(`https://api.json-generator.com/templates/3S81biFVdmrd/data?access_token=${mockToken}`)
    })
    test('It should set the result in the state', async () => {
      const mockData = [
        {index: 0},
        {index: 1},
        {index: 2},
        {index: 3}
      ]
      fetch.get.mockReturnValue(Promise.resolve(mockData))
      await store.dispatch('transferHistory/getAll')
      expect(store.state.transferHistory).toHaveProperty('data', mockData)
    })
  })
})