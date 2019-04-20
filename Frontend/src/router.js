import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import motorista from './views/Motoristas.vue'
import passageiro from './views/Passageiros.vue'
import corrida from './views/Corridas.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/Motoristas',
      name: 'motoristas',
      component: motorista
    },
    {
      path: '/Passageiros',
      name: 'passageiros',
      component: passageiro
    },
    {
      path: '/Corridas',
      name: 'corridas',
      component: corrida
    }
  ]
})
