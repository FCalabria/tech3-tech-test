import { createLocalVue, shallowMount } from '@vue/test-utils'
import Vuex from 'vuex'
import selectedItem from '@/mixins/selectedItem'

describe('Selected item mixin', () => {
  const mockData = [{
    index: 0,
    guid: 'thisisafakeguid1'
  },{
    index: 1,
    guid: 'thisisafakeguid2'
  },{
    index: 2,
    guid: 'thisisafakeguid3'
  }]
  const mockComponentOptions = {
    mixins: [selectedItem],
    template: '<div>Nothing to see</div>'
  }
  let localVue, store
  function getWrapper ($routeParams = {}, transferData = mockData) {
    const component = localVue.component('mockComponent', mockComponentOptions)
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
      store,
      mocks: {
        $route: { params: $routeParams }
      }
    })
  }
  beforeEach(() => {
    localVue = createLocalVue()
    localVue.use(Vuex)
  })
  test('it should define a selectedItem property when transferData is populated and the itemIndex is defined', () => {
    const wrapper = getWrapper({itemIndex: '0'})
    expect(wrapper.vm.selectedItem).not.toBeUndefined()
  })
  test('selectedItem should be the correct element', () => {
    const wrapper = getWrapper({itemIndex: '2'})
    expect(wrapper.vm.selectedItem).toEqual(mockData[2])
  })
  test('selectedItem should be undefined if there is no itemIndex', () => {
    const wrapper = getWrapper()
    expect(wrapper.vm.selectedItem).toBeUndefined()
  })
  test('selectedItem should be undefined if there is no transferData', () => {
    const wrapper = getWrapper({itemIndex: '0'}, [])
    expect(wrapper.vm.selectedItem).toBeUndefined()
  })
})