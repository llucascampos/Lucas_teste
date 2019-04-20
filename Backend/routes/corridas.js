const express = require('express');
const router = express.Router();
const connection = require('../banco/db.js')
const bodyParser = require('body-parser')
router.use(bodyParser.urlencoded({extended: true}))
router.use(bodyParser.json())
   

router.post('/', function(req, res){ 
    var sql = `INSERT INTO corrida (valor, idMotorista, idPassageiro) VALUES(?, ?, ?)`;
    connection.query(sql, [req.body.valor , req.body.motorista.id_motorista, req.body.passageiro.id_passageiro], function (error, result, res) {
        if (error) throw error; 
    });
    res.send(JSON.stringify({"status": 200, "error": null}));
});
 
router.get('/', function(req, res) {
    connection.query(` select motorista.nome as nomeMotorista, passageiro.nome as nomePassageiro, corrida.valor from corrida 
    inner join motorista on corrida.idMotorista = motorista.id_motorista  
    inner join passageiro on corrida.idPassageiro = passageiro.id_passageiro; `, function (error, results, fields) {
        if (error) throw error;
        res.send(JSON.stringify({"status": 200, "error": null, "response": results}));
    });
});

router.get('/filtrar/:filtrarPor/:filtro', function(req, res) {
    let filtrarPor = req.params.filtrarPor
    if(filtrarPor == 'motorista'){ 
        filtrarPor = 'motorista.nome'
    } else if(filtrarPor == 'passageiro'){ 
        filtrarPor = 'passageiro.nome'
    }
    let filtro = req.params.filtro
     connection.query(` select motorista.nome as nomeMotorista, passageiro.nome as nomePassageiro, corrida.valor from corrida 
                        inner join motorista on corrida.idMotorista = motorista.id_motorista  
                        inner join passageiro on corrida.idPassageiro = passageiro.id_passageiro where ${filtrarPor} = '${filtro}';`, function (error, results, fields) {
         if (error) throw error;
         res.send(JSON.stringify({"status": 200, "error": null, "response": results}));
     });
 });

 
module.exports = router

    