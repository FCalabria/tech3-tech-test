<template>
  <Card
    :class="`item border-2 ${isSelected ? 'bg-blue-100 border-blue-600' : 'border-blue-900'}`"
    title-classes="bg-blue-900 text-white"
    content-classes="flex justify-between"
  >
    <template v-slot:title>
      <span class="text-xs">{{ index }}</span>
      <span class="font-bold mx-3 capitalize">{{ type }}</span>
      <div class="flex items-end md:items-center flex-col md:flex-row ml-auto">
        <time class="text-sm text-blue-200 order-2 md:order-1">{{ createdDate }}</time>
        <router-link
          class="ml-3 link-negative order-1 md:order-2"
          :to="{path: `/detail/${index}`}"
        >
          {{ $t('actions.detail') }}
        </router-link>
      </div>
    </template>
    <template v-slot:content>
      <span :class="[statusColor]">{{ status }}</span>
      <span class="text-lg">{{ amount | currency }}</span>
    </template>
  </Card>
</template>
<script>
import Card from './Card.vue'
export default {
  name: 'Item',
  components: {
    Card
  },
  props: {
    index: {
      required: true,
      type: Number,
    },
    type: {
      required: true,
      type: String,
      validator: (value) => {
        return ['SUBMISSION', 'REVERSAL', 'ADMISSION'].includes(value)
      }
    },
    status: {
      required: true,
      type: String,
      validator: (value) => {
        return ['DECLINED', 'ACCEPTED'].includes(value)
      }
    },
    amount: {
      required: true,
      type: Number
    },
    created: {
      required: true,
      type: Date,
      validator: (value) => {
        return value.toString() !== 'Invalid Date'
      }
    }
  },
  computed: {
    createdDate: function () {
      return this.$d(this.created, 'shortTime')
    },
    statusColor: function () {
      return this.status === 'DECLINED' ? 'text-red-800' : 'text-green-800'
    },
    isSelected: function () {
      return this.$route.params.itemIndex && this.$route.params.itemIndex === this.index.toString()
    }
  }
}
</script>
<style scoped>
.item {
  scroll-snap-align: start;
}
</style>