<template>
  <div class="shadow rounded-sm">
    <div :class="['p-3 flex items-center', titleClasses]">
      <slot name="title" />
    </div>
    <div :class="['p-3', contentClasses]">
      <slot name="content" />
    </div>
  </div>
</template>

<script>
export default {
  name: 'Card',
  props: {
    titleClasses: {
      type: String,
      default: ''
    },
    contentClasses: {
      type: String,
      default: ''
    }
  }
}
</script>