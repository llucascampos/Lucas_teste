<template>
  <v-app>
    <app-header />
    <app-menu />
    <router-view></router-view>
     <app-footer class="footer"/>
  </v-app>
</template>

<script>
import AppHeader from './components/AppHeader.vue'
import AppFooter from './components/AppFooter.vue'
import AppMenu from './components/AppMenu.vue'
export default {
  components:{
    AppHeader,
    AppFooter,
    AppMenu
  },
}
</script>

<style scoped>


</style>
