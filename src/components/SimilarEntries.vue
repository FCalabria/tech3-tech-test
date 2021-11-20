<template>
  <Card
    class="mt-4 overflow-hidden flex flex-col"
    title-classes="bg-blue-100"
    content-classes="overflow-auto"
  >
    <template v-slot:title>
      <h2 class="font-bold">
        {{ $t('similarEntries') }}
      </h2>
    </template>
    <template v-slot:content>
      <ul class="space-y-1">
        <li
          v-for="entry in similarEntries"
          :key="entry.index"
        >
          <router-link :to="{path: `/detail/${entry.index}`}">
            {{ entry.guid }}
          </router-link>
        </li>
      </ul>
    </template>
  </Card>
</template>

<script>
import similarEntries from '@/mixins/similarEntries'
import Card from './Card.vue'

export default {
  name: 'SimilarEntries',
  components: {
    Card
  },
  mixins: [
    similarEntries
  ],
  props: {
    selectedItem: {
      type: Object,
      required: true
    }
  }
}
</script>