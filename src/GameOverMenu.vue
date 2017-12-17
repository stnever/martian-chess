<template>
  <div>
    <h1>Game Over!</h1>

    <p>Winner: {{winner.name}} (score: {{winner.score}})</p>

    <p v-for="(p, index) in nonWinners" :key="index">
      {{p.name}}: score {{p.score}}
    </p>

    <button @click="startGame">New 2-player Game</button>
  </div>
</template>

<script>
export default {
  computed: {
    winner() { return this.$store.state.players.find(p => p.isWinner) },
    nonWinners() { return this.$store.state.players.filter(p => !p.isWinner) },
  },
  methods: {
    startGame() {
      this.$store.commit('newGame', {numPlayers: 2})
    }
  }
}
</script>

<style>
</style>
