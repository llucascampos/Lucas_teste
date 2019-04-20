<template>
  <div>
    <v-toolbar color="primary lighten-1" dark>
      <v-toolbar-side-icon @click="abrirMenu()"></v-toolbar-side-icon>
      <v-toolbar-title> <v-btn flat to="/"><v-icon>home</v-icon></v-btn></v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items class="hidden-sm-and-down">
        <v-btn flat to="/Motoristas">Motoristas</v-btn>
        <v-btn flat to="/Passageiros">Passageiros</v-btn>
        <v-btn flat to="/Corridas">Corridas</v-btn>
      </v-toolbar-items>
    </v-toolbar>
  </div>
</template>

<script>
import { mapMutations } from 'vuex'
export default {
   methods: {
      ...mapMutations([
        'abrirMenu'
      ]),
    },
    computed: {
      menu(){
        return this.$store.state.menu
      }
    },

}
</script>

<style>

</style>
