<template>
  <div class="h-screen grid">
    <Spinner
      v-if="loading"
      class="justify-self-center place-self-center"
    />
    <ItemsList
      v-else
      :data="transferData"
    />
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'
import ItemsList from '@/components/ItemsList.vue'
import Spinner from 'vue-simple-spinner'

export default {
  name: 'Home',
  components: {
    ItemsList,
    Spinner
  },
  computed: {
    ...mapState({
      transferData: state => state.transferHistory.data,
      loading: state => state.transferHistory.loading
    }),
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
