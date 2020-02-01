import socketio from 'socket.io'
import player from './../Player/player.js'
import game from './../Game/game.js'

export default function socketController() {

    // Socket Enviar para um Socket
    // socket.emit('eventoEmit', {})

    // Socket Enviar para todos
    // sockets.emit(command.type, command)

    // Evento Receber
    // socket.on('eventoReceive', (command) => {})

    let sockets
    let server
    let currentGame

    function registerController() { // Registra os controles do Socket
        socketOn();
        currentGame = game();
    }

    function notifyAll(type, command) {
        console.log(`Emmiting ${command}`)

        sockets.emit(type, command)
    }

    function socketOn() { // Aguarda novas conexões
        sockets.on('connection', (socket) => {
            const socketId = socket.id

            currentGame.addPlayer({ socketId: socketId })
            currentGame.state.countPlayersOnline++;

            notifyAll("gameObject", currentGame.state)

            console.log("Players Online: ", currentGame.state.countPlayersOnline)

            socket.on('keyBoard-player', (command) => {
                command.socketId = socketId
                command.type = 'keyBoard-player'

                let playerSocket = player()
                playerSocket.setCommandPlayer(command, currentGame)
                notifyAll("gameObject", currentGame.state)
            })

            socket.on('disconnect', () => {
                currentGame.removePlayer({ socketId: socketId })
                currentGame.state.countPlayersOnline--;
                console.log("Players Online: ", currentGame.state.countPlayersOnline)
                notifyAll("gameObject", currentGame.state)
            })
        })

    }

    function setSocketServer(server) { // Atribui o Socket ao Server criado no Server.js
        server = server
        sockets = socketio(server)
    }

    return {
        server, currentGame,
        setSocketServer, registerController, notifyAll
    }
}