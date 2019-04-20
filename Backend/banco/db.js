mysql = require('mysql')

    var connection = mysql.createConnection({
        port: '41890',
        host: 'mysql995.umbler.com',
        user : 'llucascampos',
        password : '789654123l',
        database : 'lucas_teste'
    });

    // var connection = mysql.createConnection({
    //     host: 'localhost',
    //     user : 'root',
    //     password : '',
    //     database : 'compartilha_corrida'
    // });
 
    connection.connect(function(err) {
        if (err) throw err;
        console.log("DataBase OK");
      });
 

module.exports = connection