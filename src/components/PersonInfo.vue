<template>
  <Card title-classes="bg-blue-100">
    <template v-slot:title>
      <h2 class="font-bold">
        {{ title }}
      </h2>
    </template>
    <template v-slot:content>
      <p><span class="text-gray-500">{{ $t('person.name') }}:</span> {{ name }}</p>
      <p><span class="text-gray-500">{{ $t('person.sortCode') }}:</span> {{ sortCode }}</p>
      <p><span class="text-gray-500">{{ $t('person.account') }}:</span> {{ account }}</p>
    </template>
  </Card>
</template>

<script>
import Card from './Card.vue'

export default {
  name: 'PersonInfo',
  components: {
    Card
  },
  props: {
    title: {
      type: String,
      default: '--'
    },
    name: {
      type: String,
      required: true
    },
    sortCode: {
      type: String,
      required: true
    },
    account: {
      type: Number,
      required: true
    }
  }
}
</script>