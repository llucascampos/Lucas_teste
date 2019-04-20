const compartilhandoFuncoes = {
    data(){
        return{
            //snakebar
            snackbar: false,
            color: '',
            mode: '',
            timeout: 3000,
            text: 'Salvo com Sucesso',
            y: 'top',

            //validação
            obrigatorio: [
              v => !!v || 'Campo Obrigatório'
            ], 
            documentoValido:[
              v => !!v || 'Campo Obrigatório',
              v => v.length == 14 || 'Insira um CPF Válido'
            ],
            dataValida:[
              v => !!v || 'Campo Obrigatório',
              v => v.length == 10 || 'Insira a Data Corretamente'
            ],
        }
    },
    methods:{
        formatarData(data){
            let configData = data.split("-");
            let dataFormatada =
              configData[2].split("T")[0] +
              "/" +
              configData[1] +
              "/" +
              configData[0];
            return dataFormatada;
          },
    
          formataDataParaBanco(data){
            var dia  = data.split("/")[0];
            var mes  = data.split("/")[1];
            var ano  = data.split("/")[2];
            return ano + '-' + ("0"+mes).slice(-2) + '-' + ("0"+dia).slice(-2)
          },
          
          formatarCpf(cpf){
            return cpf.replace(/\D/g, '')
          },

          mCpf(cpf){
            cpf=cpf.replace(/\D/g,"")
            cpf=cpf.replace(/(\d{3})(\d)/,"$1.$2")
            cpf=cpf.replace(/(\d{3})(\d)/,"$1.$2")
            cpf=cpf.replace(/(\d{3})(\d{1,2})$/,"$1-$2")
            return cpf
           },
    }
}

export default compartilhandoFuncoes