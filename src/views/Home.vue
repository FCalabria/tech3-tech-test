<template>
  <div :class="`home h-screen grid md:grid-rows-1 p-3 gap-5 overflow-hidden ${$attrs.itemIndex ? 'grid-rows-2 md:grid-cols-2' : 'grid-rows-1'}`">
    <Spinner
      v-if="loading"
      class="justify-self-center place-self-center"
    />
    <ItemsList
      v-else
      :data="transferData"
    />
    <div
      v-if="selectedItem"
      class="flex flex-col"
    >
      <ItemDetail
        :debtor="selectedItem.attributes.debtor"
        :beneficiary="selectedItem.attributes.beneficiary"
      />
      <SimilarEntries :selected-item="selectedItem" />
    </div>
  </div>
</template>

<script>
import Spinner from 'vue-simple-spinner'
import { mapActions, mapState } from 'vuex'
import ItemsList from '@/components/ItemsList.vue'
import ItemDetail from '@/components/ItemDetail.vue'
import SimilarEntries from '@/components/SimilarEntries.vue'
import selectedItem from '@/mixins/selectedItem'

export default {
  name: 'Home',
  components: {
    ItemsList,
    ItemDetail,
    SimilarEntries,
    Spinner
  },
  mixins: [
    selectedItem
  ],
  computed: {
    ...mapState({
      transferData: state => state.transferHistory.data,
      loading: state => state.transferHistory.loading
    })
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
