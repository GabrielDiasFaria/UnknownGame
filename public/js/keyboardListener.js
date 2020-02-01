export default function keyboardListener(document, skContClient) {
    document.addEventListener("keydown", handlerKeydown);

    function handlerKeydown(event) {
        const keyPressed = event.key;
        const command = {
            type: 'keyBoard-player',
            socketId: skContClient.socket.id,
            keyPressed
        }
        //console.log(command)
        skContClient.emitControl(command)
    }
}