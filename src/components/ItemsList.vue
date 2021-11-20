<template>
  <div class="items-list space-y-4 overflow-y-auto">
    <Item
      v-for="item in data"
      :ref="`item-${item.index}`"
      :key="item.guid"
      :index="item.index"
      :type="item.type"
      :status="item.status"
      :amount="item.amount"
      :created="item.created"
    />
  </div>
</template>

<script>
import Item from './Item.vue'
export default {
  name: 'ItemsList',
  components: {
    Item
  },
  props: {
    data: {
      required: true,
      type: Array
    }
  },
  computed: {
    selectedId () {
      return this.$route.params.itemIndex
    }
  },
  watch: {
    selectedId (newValue) {
      const selectedCoordinates = this.$refs[`item-${newValue}`][0].$el.offsetTop
      this.$el.scrollTo({ top: selectedCoordinates, behavior: 'smooth'})
    }
  }
}
</script>
<style scoped>
.items-list {
  scroll-snap-type: y mandatory;
}
</style>
