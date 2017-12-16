<template>
  <div>
    <h1>Martian Chess</h1>

    <p>Rules are over at <a href="https://en.wikipedia.org/wiki/Martian_chess">Wikipedia</a></p>

    <p>Quick summary: Pawn move like checker pieces, Drones move like chess
      towers (but limited to 2 squares), and Queens move like chess queens.</p>

    <p>The catch: when you move a piece into your opponent's territory, it
      changes ownership!</p>      

    <button @click="startGame">New 2-player Game</button>
  </div>
</template>

<script>
export default {
  methods: {
    startGame() {
      this.$store.commit('newGame', {numPlayers: 2})
    }
  }
}
</script>

<style>
</style>
