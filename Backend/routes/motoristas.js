const express = require('express');
const router = express.Router();
const connection = require('../banco/db.js')
const bodyParser = require('body-parser')
router.use(bodyParser.urlencoded({extended: true}))
router.use(bodyParser.json())
   
router.get('/', function(req, res) {
    connection.query('SELECT id_motorista, nome, dataNascimento, cpf, sexo, modeloCarro, ativo from motorista', function (error, results, fields) {
        if (error) throw error;
        res.send(JSON.stringify({"status": 200, "error": null, "response": results}));
    });
});
  
router.get('/viagem', function(req, res) {
    connection.query('SELECT id_motorista, nome, sexo, modeloCarro from motorista where ativo = 1', function (error, results, fields) {
        if (error) throw error;
        res.send(JSON.stringify({"status": 200, "error": null, "response": results}));
    });
});

router.post('/', function(req, res){ 
    var sql = `INSERT INTO motorista (nome, dataNascimento, cpf, sexo, modeloCarro, ativo) VALUES(?, ?, ?, ?, ?, ?)`;
    connection.query(sql, [req.body.nome , req.body.nascimento, req.body.cpf, req.body.sexo, req.body.modeloCarro , req.body.ativo], function (error, result, res) {
        if (error) throw error;
    });
    res.send(JSON.stringify({"status": 200, "error": null }));
});

router.put('/', function(req, res){   
    var sql = `UPDATE motorista SET nome = '${req.body.nome}', cpf = '${req.body.cpf}', dataNascimento = '${req.body.nascimento}', sexo = '${req.body.sexo}', modeloCarro = '${req.body.modeloCarro}', ativo = ${req.body.ativo} WHERE id_motorista = '${req.body.id_motorista}'`;
    connection.query(sql, function (error, result, res) {
        if (error) throw error;
    });
    res.send(JSON.stringify({"status": 200, "error": null}));
});

router.get('/filtrar/:filtrarPor/:filtro', function(req, res) {
    let filtrarPor = req.params.filtrarPor
    if(filtrarPor == 'modelo do carro'){ 
        filtrarPor = 'modeloCarro'
    }
    let filtro = req.params.filtro
     connection.query(`SELECT id_motorista, nome, dataNascimento, cpf, sexo, modeloCarro, ativo from motorista where ${filtrarPor} = '${filtro}'`, function (error, results, fields) {
         if (error) throw error;
         res.send(JSON.stringify({"status": 200, "error": null, "response": results}));
     });
 });

module.exports = router

    