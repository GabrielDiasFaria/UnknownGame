export default function socketControllerClient() {

    let socket

    function emitControl(command) {
        this.socket.emit(command.type, command)
    }

    return {
        socket,
        emitControl
    }

}