<template>
  <sprite :position="pos" :size="[40, 40]" :css-class="cssClass"
    @click.native="handleClick"/>
</template>

<script>
import Coords from './Coords'

export default {
  props: {
    data: {type: Object, required: true}
  },
  computed: {
    pos() {
      var y = Coords.rows[this.data.position[0]],
          x = Coords.cols[this.data.position[1]]

      return [x,y]
    },
    cssClass() {
      var move = this.data.move
      return 'square ' + (move ? 'has-move ' + move.type : '')
    }
  },
  methods: {
    handleClick() { this.$store.dispatch('squareClicked', this.data.position) }
  }
}
</script>

<style>
.square {
  background-color: #cdc0b4;
  border-radius: 3px;
  z-index: 100;
}

.has-move {
  cursor: pointer;
  background-color: #998b7d;
  box-shadow: 0 0 4px 3px #ffe900;
}

.has-move.capture {
  box-shadow: 0 0 4px 3px red;
}
</style>
