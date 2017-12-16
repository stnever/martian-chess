<template>
  <div class="player-panel" :class="cssClass">
    <h1>{{player.name}}</h1>

    <section>
      <label>Captured pieces (score: {{player.score}})</label>
      <div class="piece" :class="[p.color, p.rank]" v-for="p in player.captures"/>
    </section>
  </div>
</template>

<script>
export default {
  props: {
    player: {type: Object, required: true}
  },
  computed: {
    isActive() {
      return this.$store.getters.activePlayer.color == this.player.color
    },
    cssClass() {
      return this.player.color + ' ' + (this.isActive ? 'active' : '')
    }
  }
}
</script>

<style>
.player-panel {
  background-color: white;
  margin-left: 200px;
  margin-top: 6px;
  margin-right: 6px;
  border-radius: 3px;
  padding: 10px;
}

.player-panel h1 {
  font-size: 16px;
  padding: 0;
  margin: 0 0 10px 0;
}

.player-panel section {
  border-radius: 3px;
  text-align: left;
  padding: 5px;
  background-color: rgba(255, 255, 255, .8);
}

.player-panel section label {
  font-size: 14px;
  display: block;
}

.player-panel section .piece {
  background-color: transparent !important;
}

.player-panel.red.active {
  background-color: #ff4231;
}

.player-panel.blue.active {
  background-color: #637ece;
}
</style>
