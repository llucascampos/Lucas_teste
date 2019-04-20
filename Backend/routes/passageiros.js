const express = require('express');
const router = express.Router();
const connection = require('../banco/db.js')
const bodyParser = require('body-parser')
router.use(bodyParser.urlencoded({extended: true}))
router.use(bodyParser.json())
   
router.get('/', function(req, res) {
    connection.query('SELECT id_passageiro, nome, dataNascimento, cpf, sexo from passageiro', function (error, results, fields) {
        if (error) throw error;
        res.send(JSON.stringify({"status": 200, "error": null, "response": results}));
    });
});

router.get('/filtrar/:filtrarPor/:filtro', function(req, res) {
    let filtrarPor = req.params.filtrarPor
    let filtro = req.params.filtro
     connection.query(`SELECT id_passageiro, nome, dataNascimento, cpf, sexo from passageiro where ${filtrarPor} = '${filtro}'`, function (error, results, fields) {
         if (error) throw error;
         res.send(JSON.stringify({"status": 200, "error": null, "response": results}));
     });
 });
 
router.post('/', function(req, res){ 
    var sql = `INSERT INTO passageiro (nome, dataNascimento, cpf, sexo ) VALUES(?, ?, ?, ?)`;
    connection.query(sql, [req.body.nome , req.body.nascimento, req.body.cpf, req.body.sexo ], function (error, result, res) {
        if (error) throw error;
    });
    res.send(JSON.stringify({"status": 200, "error": null }));
});

 router.put('/', function(req, res){   
    var sql = `UPDATE passageiro SET nome = '${req.body.nome}', cpf = '${req.body.cpf}', dataNascimento = '${req.body.nascimento}', sexo = '${req.body.sexo}' WHERE id_passageiro = '${req.body.id_passageiro}'`;
    connection.query(sql, function (error, result, res) {
        if (error) throw error;
    });
    res.send(JSON.stringify({"status": 200, "error": null}));
});
   

module.exports = router

    