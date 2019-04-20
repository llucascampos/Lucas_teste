<template>
  <div>
    <v-layout>
      <v-snackbar
        v-model="snackbar"
        :color="color"
        :multi-line="mode === 'multi-line'"
        :timeout="timeout"
        :vertical="mode === 'vertical'"
        :top="y === 'top'"
      >
        {{ text }}
        <v-btn dark flat @click="snackbar = false">Fechar</v-btn>
      </v-snackbar>
    </v-layout>

     <div class=" mt-3 mb-5">
        <v-layout  wrap justify-space-around>
            <v-flex  xs12 sm4 md4 >
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
            <v-flex sm2>
                <v-btn color="primary" :disabled="this.filtro == ''" @click="filtrar()">Filtrar</v-btn>
            </v-flex>
        </v-layout>
    </div>

    <v-toolbar>
      <v-toolbar-title>Passageiros</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-tooltip top>
        <template v-slot:activator="{ on }">
          <v-btn v-on="on" fab dark color="green" @click="inicializando()" small> <v-icon dark>replay</v-icon></v-btn>
        </template>
        <span>Atualizar página</span>
      </v-tooltip>
      <v-tooltip top>
        <template v-slot:activator="{ on }">
          <v-btn v-on="on" fab dark color="primary" @click="dialog = true" small> <v-icon dark>add</v-icon></v-btn>
        </template>
        <span>Adicionar passageiro</span>
      </v-tooltip>
    </v-toolbar>
     <v-dialog v-model="dialog" max-width="70%"  persistent>
        <v-card justify-center>
          <v-form ref="form">
          <v-card-title>
            <span class="headline">{{ formTitle }}</span>
          </v-card-title>

          <v-card-text>

            <v-container grid-list-md>
              <v-layout wrap justify-center>
                <v-flex xs12 sm6 md10>
                  <v-text-field v-model="passageiro.nome" label="Nome" :rules="obrigatorio"  append-icon="face"></v-text-field>
                </v-flex>
              </v-layout>
              <v-layout wrap justify-center>
                <v-flex xs12 sm6 md10>
                  <v-text-field v-model="passageiro.cpf" label="CPF" :rules="documentoValido" v-mask="'###.###.###-##'"  append-icon="perm_identity"></v-text-field>
                </v-flex>
              </v-layout>
              <v-layout wrap justify-center>
                <v-flex xs12 sm6 md10>
                  <v-text-field v-model="passageiro.nascimento" label="Data de Nascimento" :rules="dataValida" v-mask="'##/##/####'"  append-icon="date_range"></v-text-field>
                </v-flex>
              </v-layout>
              
              <v-layout wrap justify-center>
                <v-flex xs12 sm6 md5>
                  <v-radio-group v-model="passageiro.sexo" :mandatory="false" row :rules="obrigatorio">
                    <v-radio label="Masculino" value="Masculino"></v-radio>
                    <v-radio label="Feminino"  value="Feminino"></v-radio>
                  </v-radio-group>
                </v-flex>
  
              </v-layout>
            </v-container>
          </v-card-text>

          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" flat @click="fechar">Cancelar</v-btn>
            <v-btn color="blue darken-1" flat @click="salvar">Salvar</v-btn>
          </v-card-actions>
          </v-form>
        </v-card>
      </v-dialog>

    <v-data-table :headers="headers" :items="listaPassageiros"  hide-actions class="elevation-1" no-data-text="Sem Dados">
      <template v-slot:items="props">
        <td class="text-xs-left">{{ props.item.nome }}</td>
        <td class="text-xs-left">{{ mCpf(props.item.cpf) }}</td>
        <td class="text-xs-left">{{ formatarData(props.item.dataNascimento) }}</td>
        <td class="text-xs-left">{{ props.item.sexo }}</td>
        <td class="justify-center layout px-0">
            <v-tooltip top>
              <template v-slot:activator="{ on }">
                <v-icon  class="mr-2" @click="editarItem(props.item)">edit</v-icon>
              </template>
              <span>Editar</span>
            </v-tooltip>
        </td>
      </template>
    </v-data-table>
  </div>
</template>

<script>
import axios from 'axios'
import FuncoesCompartilhadas from '../mixins/FuncoesCompartilhadas.js'
var urlPadrao = 'http://localhost:8081'
export default {
  mixins: [FuncoesCompartilhadas],
   data: () => ({
      dialog: false,
      headers: [
        { text: 'Nome',                align: 'left', value: 'nome',       sortable: false},
        { text: 'CPF',                 align: 'left', value: 'cpf',        sortable: false },
        { text: 'Data de Nascimento',  align: 'left', value: 'nascimento', sortable: false },
        { text: 'Sexo',                align: 'left', value: 'sexo',       sortable: false },
        { text: 'Ações',                              value: 'acoes',      sortable: false }
      ],

      listaPassageiros: [],
      editarIndex: -1,
      passageiro: {
        nome: null,
        cpf: '',
        nascimento: '',
        sexo: null,
      },
      defaultItem: {
        nome: null,
        cpf: '',
        nascimento: '',
        sexo: null,
      },
      filtrarPor: null,
      filtro: '',
      opcoesFiltro: ['Nome', 'CPF', 'Sexo'],
    }),

    computed: {
      formTitle () {
        return this.editarIndex === -1 ? 'Adicionar passageiro' : 'Editar passageiro'
      }
    },

    watch: {
      dialog (val) {
        val || this.fechar()
      }
    },

    created () {
      this.inicializando()
    },

    methods: {
      inicializando () {
        axios.get(`${urlPadrao}/passageiros`, 
        { 
          headers: {
            'content-type': 'application/json',
            'Accept': 'application/json',
            'Access-Control-Allow-Credentials':true,
            'Access-Control-Allow-Origin':true
          }})
          .then(response => {
            this.listaPassageiros = response.data.response
            console.log(response.data)
          })
        .catch(error => {
          console.log(error)
          this.errored = true
        })
      },
      editarItem (item) {
        this.editarIndex = this.listaPassageiros.indexOf(item)
        this.passageiro = Object.assign({}, item)
        this.passageiro.cpf = this.mCpf(this.passageiro.cpf)
        this.passageiro.nascimento = this.formatarData(this.passageiro.dataNascimento)
        this.dialog = true
      },
      fechar () {
        this.dialog = false
        setTimeout(() => {
          this.$refs.form.resetValidation()
          this.passageiro = Object.assign({}, this.defaultItem)
          this.editarIndex = -1
        }, 300)
      },
      salvar () {
        if(this.$refs.form.validate()){
          if (this.editarIndex > -1) {
            this.passageiro.nascimento = this.formataDataParaBanco(this.passageiro.nascimento)
            this.passageiro.cpf = this.formatarCpf(this.passageiro.cpf)
            axios.put(`${urlPadrao}/passageiros`, this.passageiro
          ).then(response => {
            this.text = "Atualizado com sucesso"
            this.snackbar = true
            this.inicializando()
            this.fechar()
          })
          .catch(error => {
            console.log(error)
            this.errored = true
          })
          } else {
              this.passageiro.nascimento = this.formataDataParaBanco(this.passageiro.nascimento)
              this.passageiro.cpf = this.formatarCpf(this.passageiro.cpf)
              axios.post(`${urlPadrao}/passageiros`, this.passageiro)
                .then(response =>{ 
                  this.snackbar = true
                  this.inicializando()                       
              });    
          }
          this.fechar()
        }
      },
       
       filtrar(){    
          axios.get(`${urlPadrao}/passageiros/filtrar/${this.filtrarPor}/${this.filtro}`,
          { 
            headers: {
              'content-type': 'application/json',
              'Accept': 'application/json',
              'Access-Control-Allow-Credentials':true,
              'Access-Control-Allow-Origin':true
           }})
          .then(response => {
            this.listaPassageiros = response.data.response
            console.log(response.data)
          })
            .catch(error => {
                console.log(error)
                this.errored = true
            })  
        },
    }
}
</script>

<style>

</style>
