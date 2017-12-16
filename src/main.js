import Vue from 'vue'

// Importa Vuex e inicializa
import Vuex from 'vuex'
Vue.use(Vuex)

// Inicializa o estado do jogo via Vuex
import GameState from './GameState.js'
const store = new Vuex.Store(GameState)

// Instala a mini-engine (board e sprites)
import GameEngine from './engine/index'
Vue.use(GameEngine)

// Monta a app na raiz do html
import App from './App.vue'
new Vue({
  el: '#app',
  store,
  render: h => h(App)
})
