<template>
  <div class="shadow rounded-sm">
    <div class="p-3 bg-blue-900 text-white flex items-center">
      <span class="text-xs">{{ index }}</span>
      <span class="font-bold ml-3 capitalize">{{ type }}</span>
      <span class="text-sm text-blue-200 ml-auto">{{ createdDate }}</span>
    </div>
    <div class="p-3 flex justify-between">
      <span :class="[statusColor]">{{ status }}</span>
      <span class="text-lg">{{ amount | currency }}</span>
    </div>
  </div>
</template>
<script>
export default {
  name: 'Item',
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
      type: String,
      validator: (value) => {
        return Date(value) !== 'Invalid Date'
      }
    }
  },
  computed: {
    createdDate: function () {
      return this.$d(new Date(this.created), 'shortTime')
    },
    statusColor: function () {
      return this.status === 'DECLINED' ? 'text-red-800' : 'text-green-800'
    }
  }
}
</script>