import { createLocalVue, shallowMount } from '@vue/test-utils'
import Vuex from 'vuex'
import similarEntries from '@/mixins/similarEntries'

describe('Similar entries mixin', () => {
  const mockData = [{
    index: 0,
    guid: 'thisisafakeguid1',
    type: 'typeA',
    status: 'statusA'
  },{
    index: 1,
    guid: 'thisisafakeguid2',
    type: 'typeA',
    status: 'statusB'
  },{
    index: 2,
    guid: 'thisisafakeguid3',
    type: 'typeB',
    status: 'statusA'
  },{
    index: 3,
    guid: 'thisisafakeguid4',
    type: 'typeA',
    status: 'statusA'
  }]
  const mockComponentOptions = {
    mixins: [similarEntries],
    template: '<div>Nothing to see</div>'
  }
  let localVue, store
  function getWrapper (selectedItem, transferData = mockData) {
    const component = localVue.component('mockComponent',
      {
        ...mockComponentOptions,
        data: () => ({ selectedItem })
      }
    )
    const mockStore = {
      modules: {
        transferHistory: {
          namespaced: true,
          state: {
            data: transferData
          }
        }
      }
    }
    store = new Vuex.Store(mockStore)
    return shallowMount(component, {
      localVue,
      store
    })
  }
  beforeEach(() => {
    localVue = createLocalVue()
    localVue.use(Vuex)
  })
  test('it should define a similarEntries property when transferData is populated and the selectedItem is defined', () => {
    const wrapper = getWrapper(mockData[0])
    expect(wrapper.vm.similarEntries).toBeInstanceOf(Array)
    expect(wrapper.vm.similarEntries.length).toBeGreaterThan(0)
  })
  test('similarEntries should be correctly populated', () => {
    const wrapper = getWrapper(mockData[0])
    expect(wrapper.vm.similarEntries).toEqual([mockData[3]])
  })
  test('similarEntries should be empty if there is no itemIndex', () => {
    const wrapper = getWrapper()
    expect(wrapper.vm.similarEntries).toEqual([])
  })
  test('similarEntries should be empty if there is no transferData', () => {
    const wrapper = getWrapper(mockData[0], [])
    expect(wrapper.vm.similarEntries).toEqual([])
  })
})