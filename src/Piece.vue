<template>
  <sprite :position="pos" :size="[40, 40]" :css-class="`piece ${color} ${rank}`"
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
      // Se não temos position (peça capturada), então
      // retorna null.
      if ( this.data.position == null ) return null

      var y = Coords.rows[this.data.position[0]],
          x = Coords.cols[this.data.position[1]]

      return [x,y]
    },
    color() { return this.data.color },
    rank()  { return this.data.rank  }
  },
  methods: {
    handleClick() {
      this.$store.dispatch('squareClicked', this.data.position)
    }
  }
}
</script>

<style>
.piece {
  display: inline-block;
  height: 40px;
  width: 40px;
  z-index: 200;
  background-size: 40px;
  border-radius: 3px;
  background-color: #fff;
  cursor: pointer;
  transition: all .3s;
}

.piece.red.pawn   { background-image: url('./assets/red-pawn.png'); }
.piece.red.drone  { background-image: url('./assets/red-drone.png'); }
.piece.red.queen  { background-image: url('./assets/red-queen.png'); }
.piece.blue.pawn  { background-image: url('./assets/blue-pawn.png'); }
.piece.blue.drone { background-image: url('./assets/blue-drone.png'); }
.piece.blue.queen { background-image: url('./assets/blue-queen.png'); }
</style>
