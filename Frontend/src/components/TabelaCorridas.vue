<template>
  <div>
    <div class=" mt-3 mb-5">
      <v-layout  wrap justify-space-around>
          <v-flex  xs12 sm4 md4>
              <v-autocomplete
                  v-model="filtrarPor"
                  :items="opcoesFiltro"
                  label="Filtrar Por"
              ></v-autocomplete>
          </v-flex>
          <v-flex  xs12 sm4 md4>
              <v-text-field
                  v-model='filtro'
                  :label='this.filtrarPor'
                  :disabled="this.filtrarPor == null"
              ></v-text-field>
          </v-flex>
          <v-flex  sm2>
              <v-btn color="primary" :disabled="this.filtro == ''" @click="filtrar()">Filtrar</v-btn>
          </v-flex>
      </v-layout>
    </div>

    <v-toolbar>
      <v-toolbar-title>Registro de Corridas</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn fab dark color="green" @click="inicializando()" small> <v-icon dark>replay</v-icon></v-btn>
    </v-toolbar>

    <v-data-table :headers="headers" :items="listaViagens"  hide-actions class="elevation-1" no-data-text="Sem Dados">
      <template v-slot:items="props">
        <td class="text-xs-left">{{ props.item.nomeMotorista }}</td>
        <td class="text-xs-left">{{ props.item.nomePassageiro }}</td>
        <td class="text-xs-left">{{ formatarMoeda(props.item.valor) }}</td>
      </template>
    </v-data-table>
  </div>
</template>

<script>
import axios from 'axios'
var urlPadrao = 'https://backend-dot-lucas-teste-238218.appspot.com/'
export default {
   data: () => ({
      dialog: false,
      headers: [
        { text: 'Motorista',   align: 'left', value: 'motorista',  sortable: false},
        { text: 'Passageiro',  align: 'left', value: 'passageiro', sortable: false },
        { text: 'Valor',       align: 'left', value: 'valor',      sortable: false },
      ],

      listaViagens: [],
      filtrarPor: null,
      filtro: '',
      opcoesFiltro: ['motorista', 'passageiro'],
   }),

    created () {
      this.inicializando()
    },

    methods: {
      inicializando () {
        axios.get(`${urlPadrao}/corridas`, 
        { 
          headers: {
            'content-type': 'application/json',
            'Accept': 'application/json',
            'Access-Control-Allow-Credentials':true,
            'Access-Control-Allow-Origin':true
          }})
        .then(response => {
          this.listaViagens = response.data.response
          console.log(response.data)
        })
        .catch(error => {
        console.log(error)
        this.errored = true
        })
    },

      filtrar(){    
          axios.get(`${urlPadrao}/corridas/filtrar/${this.filtrarPor}/${this.filtro}`,
          { 
            headers: {
              'content-type': 'application/json',
              'Accept': 'application/json',
              'Access-Control-Allow-Credentials':true,
              'Access-Control-Allow-Origin':true
           }})
          .then(response => {
            this.listaViagens = response.data.response
            console.log(response.data)
          })
            .catch(error => {
                console.log(error)
                this.errored = true
            })
        },
      
      formatarMoeda(valor){
        return 'R$ ' + valor.toFixed(2)
      }
    }

}
</script>

<style>

</style>
