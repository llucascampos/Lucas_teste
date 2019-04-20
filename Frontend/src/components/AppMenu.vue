<template>
    <v-navigation-drawer
      v-model="menu"
      absolute
      temporary
      stateless
    >
      <v-list class="pt-1">
        <v-list-tile >
          <v-list-tile-content>
            <v-list-tile-title> <h3>Menu</h3></v-list-tile-title>
          </v-list-tile-content>
          <v-list-tile-action >
            <v-icon @click="fecharMenu()">close</v-icon>
          </v-list-tile-action>  
        </v-list-tile>
      </v-list>

      <v-list class="p-0" dense>
        <v-divider></v-divider>

        <v-list-tile to="/">
          <v-list-tile-action>
            <v-icon>home</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>Inicio</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>

        <v-list-tile  to="/Motoristas">
          <v-list-tile-action>
            <v-icon>drive_eta</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>Motoristas</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>

        <v-list-tile  to="/Passageiros">
          <v-list-tile-action>
            <v-icon>person</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>Passageiros</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>

        <v-list-tile  to="/Corridas">
          <v-list-tile-action>
            <v-icon>swap_horiz</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>Corridas</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>

      </v-list>
    </v-navigation-drawer>
</template>

<script>
import { mapMutations } from 'vuex'
export default {
    methods: {
      ...mapMutations([
        'fecharMenu'
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
