<template>
  <div class="space-y-4">
    <PersonInfo
      :title="$t('debtor')"
      :name="`${debtor.first_name} ${debtor.last_name}`"
      :sort-code="debtor.account.sort_code"
      :account="debtor.account.account_number"
    />
    <PersonInfo
      :title="$t('beneficiary')"
      :name="`${beneficiary.first_name} ${beneficiary.last_name}`"
      :sort-code="beneficiary.account.sort_code"
      :account="beneficiary.account.account_number"
    />
  </div>
</template>

<script>
import PersonInfo from './PersonInfo.vue'
export default {
  name: 'ItemDetail',
  components: {
    PersonInfo
  },
  props: {
    debtor: {
      type: Object,
      required: true
    },
    beneficiary: {
      type: Object,
      required: true
    }
  }
}
</script>