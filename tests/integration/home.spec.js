import fetch from 'just-fetch'
import VueCurrencyFilter from 'vue-currency-filter'
import { render, waitForElementToBeRemoved, fireEvent } from '@testing-library/vue'
import Home from '@/views/Home.vue'
import store from '@/store/index'
import router from '@/router/index'
import mockData from './mockData/getAll.json'

describe('Home', () => {
  fetch.get.mockReturnValue(Promise.resolve(mockData))
  let renderResult
  beforeEach(async () => {
    renderResult = render(Home, {
      store,
      routes: router,
      mocks: {
        $d: value => value,
        $t: value => value
      }
    }, vue => {
      vue.use(VueCurrencyFilter)
    })
    await waitForElementToBeRemoved(() => renderResult.queryByTestId('loading-spinner'))
  })
  test('it should show the list of transfers', () => {
    const result = renderResult.html()
    expect(result).toMatchSnapshot()
  })
  test('it should show the detail when a "view detail" link is clicked', async () => {
    const { getAllByRole, queryByTestId } = renderResult
    const links = getAllByRole('link', { name: 'actions.detail' })
    expect(queryByTestId('detail-section')).toBeNull()
    await fireEvent.click(links[2])
    const detail = queryByTestId('detail-section')
    expect(detail).not.toBeNull()
    expect(detail).toMatchSnapshot()
  })
})