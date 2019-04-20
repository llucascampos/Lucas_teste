<template>
    <v-container>
        <div class="text-xs-center mt-5" >
            <v-layout align-center justify-center row >
                <v-flex>
                <h1>BEM VINDO A APLICAÇÃO DE CORRIDAS COMPARTILHADAS</h1>
                <cadastrar-viagem class="mt-5" />
                </v-flex>
            </v-layout>
        </div>
        
    </v-container>
</template>

<script>
import CadastrarViagem from '../components/CadastrarViagem'
export default {
    components: {
        CadastrarViagem
    }

}
</script>

<style>

</style>
