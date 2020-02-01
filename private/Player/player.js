export default function player() {

    let viewMap

    let socketId
    let x
    let y
    let speed
    let width
    let height
    let maxLife
    let currentLife
    let maxMana
    let currentMana

    let outfit
    let currentClip
    let clipX
    let clipY

    function setCommandPlayer(command, currentGame) {

        const acceptedMoves = {
            ArrowUp(player) {
                player.y -= player.speed
                player.clipY = 3 * currentGame.state.screen.sizeGlobalY
                return
            },
            ArrowDown(player) {
                player.clipY = 0
                player.y += player.speed
                return
            },
            ArrowLeft(player) {
                player.clipY = 1 * currentGame.state.screen.sizeGlobalX
                player.x -= player.speed
                return
            },
            ArrowRight(player) {
                player.clipY = 2 * currentGame.state.screen.sizeGlobalX
                player.x += player.speed
                return
            }
        }

        const keyPressed = command.keyPressed;
        const player = currentGame.state.players[command.socketId];

        const moveFun = acceptedMoves[keyPressed];

        // Clip Image
        if (player.currentClip < currentGame.state.config.fixedMaxClip) {
            player.clipX = player.currentClip * currentGame.state.screen.sizeGlobalX
            player.currentClip++
        } else {
            player.currentClip = 1
        }

        if (moveFun && player) {
            moveFun(player);
        }
        //console.log(`Receive ${player.socketId}`)
    }

    return {
        // Atributos
        viewMap, socketId, x, y, width, height, outfit, maxLife, currentLife, maxMana, currentMana, currentClip, clipX, clipY,
        // Métodos
        setCommandPlayer
    }
}