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
  describe('initial state', () => {
    test('it should define data as an empty array', () => {
      expect(store.state.transferHistory).toHaveProperty('data')
      expect(store.state.transferHistory.data).toEqual([])
    })
    test('it should define error as an empty string', () => {
      expect(store.state.transferHistory).toHaveProperty('error', '')
    })
    test('it should define loading as false', () => {
      expect(store.state.transferHistory).toHaveProperty('loading', false)
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
    test('it should set loading as true while the promise is not fulfilled', () => {
      let resolver
      fetch.get.mockReturnValue(new Promise((resolve) => {
        resolver = resolve
      }))
      store.dispatch('transferHistory/getAll')
      expect(store.state.transferHistory.loading).toBeTruthy()
      resolver()
    })
    test('it should set loading as false when the promise is fulfilled', async () => {
      await store.dispatch('transferHistory/getAll')
      await localVue.nextTick() // resolve until the finally
      expect(store.state.transferHistory.loading).toBeFalsy()

      fetch.get.mockReturnValue(Promise.reject(''))
      await store.dispatch('transferHistory/getAll')
      await localVue.nextTick()
      expect(store.state.transferHistory.loading).toBeFalsy()
    })
    test('it should set the error if the promise rejects', async () => {
      fetch.get.mockReturnValue(Promise.reject(new Error('Failed')))
      await store.dispatch('transferHistory/getAll')
      expect(store.state.transferHistory.error).toEqual('Failed')
    })
  })
})