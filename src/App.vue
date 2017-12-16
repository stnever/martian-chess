<template>
  <div id="app">
    <main-menu     v-if="stage == 'menu'"/>
    <martian-chess v-if="stage == 'game'"/>
  </div>
</template>

<script>
import MartianChess from './MartianChess.vue'
import MainMenu from './MainMenu.vue'

export default {
  components: {MartianChess, MainMenu},
  computed: {
    stage() { return this.$store.state.stage }
  },
  name: 'app'
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
