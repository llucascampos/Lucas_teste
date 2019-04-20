const express = require('express')
const app = express()
const cors = require('cors')
const bodyParser = require('body-parser')
const mysql = require('mysql')
const db = require('./banco/db.js')
const apiMotoristas = require('./routes/motoristas.js')
const apiPassageiros = require('./routes/passageiros.js')
const apiCorridas = require('./routes/corridas.js')

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))
app.use(cors())


app.use('/motoristas', apiMotoristas)
app.use('/passageiros', apiPassageiros)
app.use('/corridas', apiCorridas)
  
app.listen(8081)
console.log('Servidor ok')