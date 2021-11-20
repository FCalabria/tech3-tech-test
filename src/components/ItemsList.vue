<template>
  <div class="items-list space-y-4 m-3">
    <Item
      v-for="item in data"
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
}
</script>
