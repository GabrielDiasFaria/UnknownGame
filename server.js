// JS Server
// Responsável por iniciar o servidor

// ctrl+c => desliga servidor
// npx nodemon => nodemon deixa o server com hotReload
// npm install nodemon
// npx serve => servidor temporário para rodar projeto
// nvm install node => Instala versão mais nova para os imports
// node --experimental-modules server.js

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