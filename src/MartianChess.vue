<template>
  <board :size="size">

    <!-- sprite com o quadrado -->
    <square v-for="(s, index) in allSquares" :key="`s_${index}`" :data="s"/>

    <!-- sprite com o divisor de territórios -->
    <border/>

    <!-- sprite da peça -->
    <piece v-for="(p, index) in allPieces" :key="p.id" :data="p"/>

    <player-panel v-for="(p, index) in players" :key="`l_${index}`"
      :player="p" :index="index"/>

    <div class="bottom-panel">
      <button class="btn-new-game" @click="$store.commit('newGame')">
        New Game
      </button>
    </div>

  </board>

</template>

<script>
import _ from 'lodash'

import Square from './Square.vue'
import Piece from './Piece.vue'
import PlayerPanel from './PlayerPanel.vue'
import Border from './Border.vue'
import Coords from './Coords'

export default {
  components: {Square, Piece, PlayerPanel, Border},
  data() {
    return {}
  },
  computed: {
    size() { return [600, Coords.boardHeight] },
    allSquares() { return this.$store.getters.allSquares },
    allPieces()  { return this.$store.state.allPieces },
    players()    { return this.$store.state.players }
  }
  ,
  mounted() {
    // console.log('this.squares.length', this.squares.length)
    // _.forEach(this.squares, s => console.log('row %s, col %s', s.position[0], s.position[1]))
  }
}
</script>

<style>
.board {
  margin-left: auto;
  margin-right: auto;
  display: inline-block;
  background-color: #bbad9e;
  border-radius: 6px;
}

.bottom-panel {
  background-color: #cdc0b4;
  border-radius: 3px;
  position: absolute;
  bottom: 6px;
  left: 200px;
  right: 6px;
  display: inline-block;
}

.bottom-panel button {
  margin: 5px;
  padding: 5px;
  border-radius: 3px;
  border: 1px solid #000;
}
</style>
