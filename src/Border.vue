<template>
  <sprite :position="pos" css-class="border" :size="size"/>
</template>

<script>
import Coords from './Coords'

export default {
  data() {
    return {
      pos: Coords.borderPos,
      size: Coords.borderSize
    }
  }
}
</script>

<style>
.border {
  /*border: 2px solid red;*/
  /*background-color: #ff4332;*/
  border-radius: 3px;
  background-color: #998978;
  box-sizing: border-box;
  box-shadow: 1px 1px 4px #000 inset;
}
</style>
