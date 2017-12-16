export default function installGameEngine(Vue) {
  console.log('Installing GameEngine')
  // Vue.directive('o-click-outside', require('./oClickOutside').default)

  Vue.component('board', require('./Board.vue').default)
  Vue.component('sprite', require('./Sprite.vue').default)
}
