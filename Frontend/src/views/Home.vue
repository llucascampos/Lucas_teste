<template>
    <v-container>
        <div class="text-xs-center mt-5" >
            <v-layout align-center justify-center row >
                <v-flex>
                <h1>BEM-VINDO!</h1>  <v-btn flat large  @click="iniciarTour()">Conheça a Aplicação</v-btn> 
                <cadastrar-viagem class="mt-5" />
                </v-flex>
            </v-layout>
        </div>
        <v-tour name="myTour" :steps="steps" :options="myOption"></v-tour>
    </v-container>
</template>

<script>
import CadastrarViagem from '../components/CadastrarViagem'
import VueTour from '../mixins/VueTour.js'
export default {
   mixins: [VueTour],
    components: {
        CadastrarViagem
    }

}
</script>

<style>

</style>
