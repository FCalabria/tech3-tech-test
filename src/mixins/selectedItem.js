import { mapState } from 'vuex'

export default {
  computed: {
    ...mapState({
      transferData: state => state.transferHistory.data
    }),
    selectedItem: function () {
      if (!this.transferData || !this.$route.params.itemIndex) {
        return undefined
      } else {
        return this.transferData[this.$route.params.itemIndex]
      }
    }
  }
}