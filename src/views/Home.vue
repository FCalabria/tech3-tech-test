<template>
  <div :class="`h-screen grid p-3 gap-3 ${$attrs.itemIndex ? 'md:grid-cols-2' : ''}`">
    <Spinner
      v-if="loading"
      class="justify-self-center place-self-center"
    />
    <ItemsList
      v-else
      :data="transferData"
    />
    <div v-if="selectedItem">
      <ItemDetail
        :debtor="selectedItem.attributes.debtor"
        :beneficiary="selectedItem.attributes.beneficiary"
      />
      <SimilarEntries />
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'
import ItemsList from '@/components/ItemsList.vue'
import ItemDetail from '@/components/ItemDetail.vue'
import SimilarEntries from '@/components/SimilarEntries.vue'
import Spinner from 'vue-simple-spinner'

export default {
  name: 'Home',
  components: {
    ItemsList,
    ItemDetail,
    SimilarEntries,
    Spinner
  },
  computed: {
    ...mapState({
      transferData: state => state.transferHistory.data,
      loading: state => state.transferHistory.loading
    }),
    selectedItem: function () {
      if (!this.transferData || !this.$attrs.itemIndex) {
        return {}
      } else {
        return this.transferData[this.$attrs.itemIndex]
      }
    }
  },
  created() {
    this.fetchTransferHistory()
  },
  methods: {
    ...mapActions({
      fetchTransferHistory: 'transferHistory/getAll'
    })
  }
}
</script>
