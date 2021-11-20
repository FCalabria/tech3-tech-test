<template>
  <Card
    class="item"
    title-classes="bg-blue-900 text-white"
    content-classes="flex justify-between"
  >
    <template v-slot:title>
      <span class="text-xs">{{ index }}</span>
      <span class="font-bold ml-3 capitalize">{{ type }}</span>
      <time class="text-sm text-blue-200 ml-auto">{{ createdDate }}</time>
      <router-link
        class="ml-3 link-negative"
        :to="{path: `/detail/${index}`}"
      >
        {{ $t('actions.detail') }}
      </router-link>
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
    }
  },
  methods: {
    detailClicked () {
      this.$emit('detail')
    }
  }
}
</script>
<style scoped>
.item {
  scroll-snap-align: start;
}
</style>