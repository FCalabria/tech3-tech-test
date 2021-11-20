<template>
  <div>{{index}} - {{type}} - {{status}} - {{amount | currency}} - {{createdDate}}</div>
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
      return new Date(this.created).toLocaleString(undefined, {day: '2-digit', month: '2-digit' , year: 'numeric', hour: '2-digit', minute: '2-digit', hour12: false})
    }
  }
}
</script>