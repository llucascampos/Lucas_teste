import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    menu: false

  },
  mutations: {
    fecharMenu (state) {
      state.menu = false
    },
    abrirMenu (state) {
      state.menu = true
    }

  },
  actions: {

  }
})
