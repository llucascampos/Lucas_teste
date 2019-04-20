<template>
  <div>
    <v-toolbar color="primary lighten-1" dark>
      <v-toolbar-side-icon @click="abrirMenu()"></v-toolbar-side-icon>
      <v-toolbar-title data-v-step="1"> <v-btn flat to="/"><v-icon>home</v-icon></v-btn></v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items class="hidden-sm-and-down">
        <v-btn flat to="/Motoristas"  data-v-step="3">Motoristas</v-btn>
        <v-btn flat to="/Passageiros"  data-v-step="4">Passageiros</v-btn>
        <v-btn flat to="/Corridas"  data-v-step="5">Corridas</v-btn>
      </v-toolbar-items>
    </v-toolbar>
 <v-tour name="myTour" :steps="steps" :options="myOption" :callbacks="myCallbacks"></v-tour>
  </div>
</template>

<script>
import { mapMutations } from 'vuex'
import VueTour from '../mixins/VueTour.js'
export default {
   mixins: [VueTour],
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
