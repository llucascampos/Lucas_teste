const vueTour = {
    name: 'my-tour',
    data () {
        return {
            myOption: {
                useKeyboardNavigation: false,
                labels: {
                  buttonSkip: 'Terminar tour',
                  buttonPrevious: 'Voltar',
                  buttonNext: 'Próximo',
                  buttonStop: 'Fim'
                }
              },
              
          steps: [
            {
              target: '[data-v-step="1"]',
              content: `Clique aqui quando desejar voltar para a página inicial.`
            },
            {
              target: '[data-v-step="2"]',
              content: 'Cadastrar nova corrida. Aqui você consegue cadastrar novas corridas, lembre-se para cadastrar uma corrida é necessário ter motoristas e passageiros cadastrados. ',
              params: {
                placement: 'bottom'
              }
            },
            {
              target: '[data-v-step="3"]',
              content: 'Para visualizar e cadastrar novos motoristas.',
              
            },
            {
              target: '[data-v-step="4"]',
              content: 'Para viasualizar e cadastrar novos passageiros',
            },
            {
              target: '[data-v-step="5"]',
              content: 'Visualizar corridas cadastradas',
            },
          ]
        }
      },
     methods:{
        iniciarTour(){
            this.$tours['myTour'].start()
        },
    },
        
}

export default vueTour