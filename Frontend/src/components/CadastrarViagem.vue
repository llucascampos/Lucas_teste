<template>
    <div>
        <v-layout>
          <v-snackbar
            v-model="snackbar"
            :color="color"
            :multi-line="mode === 'multi-line'"
            :timeout="timeout"
            :vertical="mode === 'vertical'"
            :top="y === 'top'">
            {{ text }}
            <v-btn dark flat @click="snackbar = false">Fechar</v-btn>
          </v-snackbar>
        </v-layout>

        <v-layout align-center justify-center>
            <v-btn color="primary" dark @click.stop="dialog = true " data-v-step="2" >
                Cadastrar Nova Corrida
            </v-btn>
        </v-layout>

        <v-dialog v-model="dialog"  persistent> 
            <v-stepper v-model="e1"  vertical>
                <v-form ref="form">
                    <v-stepper-step :complete="e1 > 1" step="1">Selecione o Motorista</v-stepper-step>
                    <v-stepper-items>
                        <v-stepper-content step="1">
                            <v-card  class="mb-2 px-5" color="green lighten-5"  height="150px">
                                <v-layout align-center justify-center row fill-height>
                                    <v-flex md7 sm10>
                                        <v-autocomplete
                                            v-model="viagem.motorista"
                                            :items="listaMotoristas"
                                            item-text="nome"
                                            label="Motorista"
                                            :rules="obrigatorio"
                                            no-data-text="Não a motoristas cadastrados"
                                            append-icon="airline_seat_recline_extra"
                                            return-object
                                        ></v-autocomplete>
                                    </v-flex>
                                </v-layout>
                            </v-card>
                            <v-btn color="primary" @click="e1 = 2">Continue</v-btn>
                            <v-btn flat @click="cancelar()">Cancelar</v-btn>
                        </v-stepper-content>

                        <v-stepper-step :complete="e1 > 2" step="2">Escolha o Passageiro</v-stepper-step>
                        <v-stepper-content step="2">
                            <v-card  class="mb-2 px-5" color="green lighten-5"  height="150px">
                                <v-layout align-center justify-center row fill-height>
                                    <v-flex md6>
                                        <v-autocomplete
                                            v-model="viagem.passageiro"
                                            :items="listaPassageiros"
                                            item-text="nome"
                                            label="Passageiro"
                                            :rules="obrigatorio"
                                            no-data-text="Não a passageiros cadastrados"
                                            append-icon="perm_identity"
                                            return-object
                                        ></v-autocomplete>
                                    </v-flex>
                                </v-layout>
                            </v-card>
                            <v-btn icon @click="e1 = 1" class="hidden-xs-only">
                                <v-icon>reply</v-icon>
                            </v-btn>
                            <v-btn color="primary" @click="e1 = 3">Continue</v-btn>
                            <v-btn flat @click="cancelar()">Cancelar</v-btn>
                        </v-stepper-content>

                        <v-stepper-step step="3">Informe o Valor</v-stepper-step>
                        <v-stepper-content step="3">
                            <v-card  class="mb-2 px-5" color="green lighten-5"  height="150px">
                                <v-layout align-center justify-center row fill-height>
                                    <v-flex md6>
                                        <v-text-field
                                            v-model="viagem.valor"
                                            label="Valor"
                                            :rules="obrigatorio"
                                            prefix="R$"
                                            type="number"
                                            append-icon="attach_money"
                                        ></v-text-field>
                                    </v-flex>
                                </v-layout>
                            </v-card>
                            <v-btn icon @click="e1 = 2" class="hidden-xs-only">
                                <v-icon>reply</v-icon>
                            </v-btn>
                            <v-btn color="primary" @click="salvar()">Salvar</v-btn>
                            <v-btn flat @click="cancelar()">Cancelar</v-btn>
                        </v-stepper-content>
                    </v-stepper-items>
                </v-form>
            </v-stepper>
        </v-dialog>
      <v-tour name="myTour" :steps="steps" :options="myOption" :callbacks="myCallbacks"></v-tour>
    </div>
</template>

<script>
import axios from 'axios'
var urlPadrao = 'http://localhost:8081'
import VueTour from '../mixins/VueTour.js'
export default {
   mixins: [VueTour],
    data () {
      return {
        dialog: false,
        e1: 0,
        listaPassageiros :[],
        listaMotoristas :[],
        viagem: {
            motorista: null,
            passageiro: null,
            valor: null
        },
        defaultItem: {
            motorista: null,
            passageiro: null,
            valor: null
        },
      
        //validação
        obrigatorio: [
            v => !!v || 'Esse campos é necessário'
        ],
        
        //snakebar
        snackbar: false,
        color: '',
        mode: '',
        timeout: 3000,
        text: 'Salvo com Sucesso',
        y: 'top',
        }
    },

    created () {
      this.inicializando()
    },
    
    methods:{
        inicializando(){
            axios.all([
                axios.get(`${urlPadrao}/Passageiros`),
                axios.get(`${urlPadrao}/Motoristas/viagem`),
                ]).then(axios.spread((responsePassageiros, responseMotoristas) => {
                    this.listaPassageiros = responsePassageiros.data.response;
                    this.listaMotoristas = responseMotoristas.data.response; 
                })).catch(function (error) {
                console.log(error.response.status);
                console.log(error);
                })
        },
        cancelar(){
            this.e1 = 1
            this.dialog = false
            this.$refs.form.resetValidation()
            this.viagem = Object.assign({}, this.defaultItem)
        },
        salvar(){
            if(this.$refs.form.validate()){
                axios.post(`${urlPadrao}/corridas`, this.viagem)
                .then(response =>{ 
                    this.snackbar = true
                    this.inicializando()
                    this.cancelar()                           
            });        
          }        
        }      
    }
  }
</script>

<style>

.v-dialog:not(.v-dialog--fullscreen) {
    max-width: 70%;
}

@media screen and (max-width: 600px) {
    .v-dialog:not(.v-dialog--fullscreen) {
    max-width: 100%;
}
}

</style>
