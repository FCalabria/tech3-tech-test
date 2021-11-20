import { mapState } from 'vuex'

export default {
  updated() {
    if (!this.selectedItem) {
      console.warn('selectedItem is expected for similarEntries logic')
    }
  },
  computed: {
    ...mapState({
      transferData: state => state.transferHistory.data
    }),
    similarEntries () {
      if (!this.selectedItem || !this.transferData) {
        return []
      }
      const {type, status} = this.selectedItem
      return this.transferData
        .filter(entry => entry.type === type && entry.status === status)
    }
  }
}