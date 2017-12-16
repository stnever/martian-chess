<template>
  <div class="board" :style="styleProps" :class="cssClass">
    <slot/>
  </div>
</template>

<script>
export default {
  props: {
    size      : {type: Array, default: () => [600, 400]},
    cssClass  : {type: String}
  },
  computed: {
    styleProps() {
      return {
        position: 'relative',
        width   : this.size[0] + 'px',
        height  : this.size[1] + 'px'
      }
    }
  }
}
</script>

<style>
</style>
