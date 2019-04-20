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
        <v-layout wrap justify-space-around>
            <v-flex xs12 sm4 md4>
                <v-autocomplete
                    v-model="filtrarPor"
                    :items="opcoesFiltro"
                    label="Filtrar Por"
                ></v-autocomplete>
            </v-flex>
            <v-flex xs12 sm4 md4>
                <v-text-field v-model='filtro' :label='this.filtrarPor' :disabled="this.filtrarPor == null"></v-text-field>
            </v-flex>
            <v-flex  sm2>
              <v-btn color="primary" :disabled="this.filtro == ''" @click="filtrar()">Filtrar</v-btn>
            </v-flex>
        </v-layout>
    </div>

    <v-toolbar>
      <v-toolbar-title>Motoristas</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn fab dark color="green" @click="inicializando()" small> <v-icon dark>replay</v-icon></v-btn>
      <v-btn fab dark color="primary" @click="dialog = true" small> <v-icon dark>add</v-icon></v-btn>
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
                    <v-text-field v-model="motorista.nome" label="Nome" :rules="obrigatorio"   append-icon="face"></v-text-field>
                  </v-flex>
                </v-layout>
                <v-layout wrap justify-center>
                  <v-flex xs12 sm6 md10>
                    <v-text-field v-model="motorista.cpf" label="CPF" :rules="documentoValido" v-mask="'###.###.###-##'"   append-icon="perm_identity"></v-text-field>
                  </v-flex>
                </v-layout>
                <v-layout wrap justify-center>
                  <v-flex xs12 sm6 md10>
                    <v-text-field v-model="motorista.nascimento" label="Data de Nascimento"  :rules="dataValida" v-mask="'##/##/####'"   append-icon="date_range"></v-text-field>
                  </v-flex>
                </v-layout>
                <v-layout wrap justify-center>
                  <v-flex xs12 sm6 md10>
                    <v-text-field v-model="motorista.modeloCarro" label="Modelo Do Carro" :rules="obrigatorio"   append-icon="drive_eta"></v-text-field>
                  </v-flex>
                </v-layout>
                <v-layout wrap justify-center>
                  <v-flex xs12 sm6 md5>
                    <v-radio-group v-model="motorista.sexo" :mandatory="false" row :rules="obrigatorio">
                      <v-radio label="Masculino" value="Masculino"></v-radio>
                      <v-radio label="Feminino"  value="Feminino"></v-radio>
                    </v-radio-group>
                  </v-flex>
                  <v-flex xs12 sm6 md3>
                    <v-switch v-model="motorista.ativo" :label=" `Status:  ${formatarStatus(this.motorista.ativo)}`"></v-switch>
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
      
      <v-data-table :headers="headers" :items="listaMotoristas"  hide-actions class="elevation-1" no-data-text="Sem Dados">
        <v-progress-linear slot="progress" color="blue" indeterminate></v-progress-linear>
        <template v-slot:items="props">
          <td class="text-xs-left">{{ props.item.nome }}</td>
          <td class="text-xs-left">{{  mCpf(props.item.cpf) }}</td>
          <td class="text-xs-left">{{ formatarData(props.item.dataNascimento) }}</td>
          <td class="text-xs-left">{{ props.item.modeloCarro }}</td>
          <td class="text-xs-left">{{ props.item.sexo }}</td>
          <td class="text-xs-left">{{ formatarStatus(props.item.ativo) }}</td>
          <td class="justify-center layout px-0">
            <v-icon  class="mr-2" @click="editarItem(props.item)">edit</v-icon>
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
        { text: 'Modelo do Carro',     align: 'left', value: 'modeloCarro',sortable: false },
        { text: 'Sexo',                align: 'left', value: 'sexo',       sortable: false },
        { text: 'Status',              align: 'left', value: 'status',     sortable: false },
        { text: 'Ações',                              value: 'acoes',      sortable: false }
      ],

      listaMotoristas: [],
      editarIndex: -1,
      motorista: {
        nome: '',
        cpf: '',
        nascimento: '',
        modeloCarro: null,
        sexo: null,
        ativo: false
      },
      defaultItem: {
        nome: '',
        cpf: '',
        nascimento: '',
        modeloCarro: null,
        sexo: null,
        ativo: false
      },
      filtrarPor: null,
      filtro: '',
      opcoesFiltro: ['Nome', 'CPF', 'Modelo do Carro', 'Sexo'],
           
      //validação
      obrigatorio: [
        v => !!v || 'Esse campos é necessário'
      ],

    }),

    computed: {
      formTitle () {
        return this.editarIndex === -1 ? 'Adicionar Motorista' : 'Editar Motorista'
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
        axios
          axios.get(`${urlPadrao}/motoristas`, 
          { 
            headers: {
              'content-type': 'application/json',
              'Accept': 'application/json',
              'Access-Control-Allow-Credentials':true,
              'Access-Control-Allow-Origin':true
          }})
          .then(response => {
            this.listaMotoristas = response.data.response
            console.log(response.data)
          })
          .catch(error => {
            console.log(error)
            this.errored = true
          })
      },

      editarItem (item) {
        this.editarIndex = this.listaMotoristas.indexOf(item)
        this.motorista = Object.assign({}, item)
        this.motorista.nascimento = this.formatarData(this.motorista.dataNascimento)
        console.log(this.motorista)
        this.dialog = true
      },
    
      fechar () {
        this.dialog = false
        setTimeout(() => {
          this.$refs.form.resetValidation()
          this.motorista = Object.assign({}, this.defaultItem)
          this.editarIndex = -1
        }, 300)
      },

      salvar () {
        if(this.$refs.form.validate()){
          if(this.editarIndex > -1) {
            this.motorista.nascimento = this.formataDataParaBanco(this.motorista.nascimento)
            this.motorista.cpf = this.formatarCpf(this.motorista.cpf)
            axios.put(`${urlPadrao}/motoristas`, this.motorista
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
            this.motorista.nascimento = this.formataDataParaBanco(this.motorista.nascimento)
            this.motorista.cpf = this.formatarCpf(this.motorista.cpf)
            axios.post(`${urlPadrao}/motoristas`, this.motorista)
              .then(response =>{ 
                this.snackbar = true
                this.inicializando()                       
            });  
          }
          this.fechar()
        }
      },

      formatarStatus(status){
         return status == 0 ? 'Inativo' : 'Ativo'
      },

      filtrar(){    
          axios.get(`${urlPadrao}/motoristas/filtrar/${this.filtrarPor}/${this.filtro}`,
          { 
            headers: {
              'content-type': 'application/json',
              'Accept': 'application/json',
              'Access-Control-Allow-Credentials':true,
              'Access-Control-Allow-Origin':true
           }})
          .then(response => {
            this.listaMotoristas = response.data.response
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
