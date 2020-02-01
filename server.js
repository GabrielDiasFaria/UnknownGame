// JS Server
// Responsável por iniciar o servidor

import express from 'express'
import http from 'http'
import socketController from './private/Socket/socketController.js'

const app = express()
const server = http.createServer(app)

// >>> socketController -> Responsável por controlar o Socket
const skController = socketController()
skController.setSocketServer(server)
skController.registerController()
// <<<

app.use(express.static('public')) // Arquivos publicos do Client
app.use(express.static('private')) // Arquivos privados do Server

server.listen(3000, () => {
    console.log("Servidor iniciado, porta: 3000")
})