<template>
  <div class="sprite" :style="styleProps" :class="cssClass"/>
</template>

<script>
export default {
  props: {
    anchor    : {type: Array, default: () => [0,0]},
    position  : {type: Array, default: () => [0,0]},
    size      : {type: Array, default: () => [100,100]},
    cssClass  : {type: String}
  },
  computed: {
    left() { return this.position ? this.position[0] - this.anchor[0] : null },
    top () { return this.position ? this.position[1] - this.anchor[1] : null },
    styleProps() {
      return {
        display : this.position ? 'inline-block' : 'none',
        position: 'absolute',
        width   : this.size[0] + 'px',
        height  : this.size[1] + 'px',
        left    : (this.left ? this.left + 'px' : null), // coord X
        top     : (this.top  ? this.top  + 'px' : null)  // coord Y
      }
    }
  }
}
</script>

<style>
</style>
