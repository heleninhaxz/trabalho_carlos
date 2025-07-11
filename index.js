const express = require('express')
const app = express()
const cors = require('cors')
require('dotenv').config()

const PORT = process.env.PORT
const HOST = 'localhost'

const db = require('./db/conn')
const Usuario = require('./controller/usuarios.controller.js')
const Produto = require('./controller/produtos.controller.js')
const Compra = require('./controller/compras.controller.js')

// midleware
app.use(express.urlencoded({extended: true}))
app.use(express.json())
app.use(cors())
// midleware

app.post('/usuario', Usuario.cadastrar)
app.get('/usuario', Usuario.listar)
app.get('/usuario/id/:id', Usuario.buscarPorId)
app.get('/usuario/nome/:nome', Usuario.buscarPorNome)
app.delete('/usuario/:id', Usuario.apagar)
app.put('/usuario/:id', Usuario.atualizar)

app.post('/produto', Produto.cadastrar)
app.get('/produto', Produto.listar)
app.get('/produto/id/:id', Produto.buscarPorId)
app.get('/produto/titulo/:titulo', Produto.buscarPorTitulo)
app.delete('/produto/:id', Produto.apagar)
app.put('/produto/:id', Produto.atualizar)

app.post('/compra', Compra.cadastrar)
app.get('/compra', Compra.listar)
app.delete('/compra/:id', Compra.apagar)
app.put('/compra/:id', Compra.atualizar)

app.get('/', (req, res)=> {
    res.send('Hello World!')
})

db.sync()
.then(()=>{
    app.listen(PORT, HOST, (req, res)=>{
        console.log(`> servidor rodando na porta: http://${HOST}:${PORT}`);
    })
})