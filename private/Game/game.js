import player from './../Player/player.js'
import firstIsland from './../Maps/firstIsland.js'

export default function game() {
    const state = {
        countPlayersOnline: 0,
        players: {
        },
        screen: {
            sizeGlobalX: 32,
            sizeGlobalY: 32,
            width: 992,
            height: 576
        },
        config: {
            pathAssetOutfit: "../../Assets/Outfit/",
            pathAssetTileSet: "../../Assets/TileSet/",
            fixedMaxClip: 3
        }
    }

    function addPlayer(command) {
        let playerAdd = player()
        let firstIslandAdd = firstIsland()
        playerAdd.socketId = command.socketId
        playerAdd.x = 0
        playerAdd.y = 0
        playerAdd.width = 0
        playerAdd.height = 0
        playerAdd.outfit = "MageFemale.png"
        playerAdd.maxLife = 0
        playerAdd.currentLife = 0
        playerAdd.maxMana = 0
        playerAdd.currentMan = 0
        playerAdd.speed = 8
        playerAdd.currentClip = 0
        playerAdd.clipX = 0
        playerAdd.clipY = 0
        playerAdd.viewMap = firstIslandAdd.getVision(playerAdd.x, playerAdd.y)

        state.players[command.socketId] = playerAdd
    }

    function removePlayer(command) {
        const socketId = command.socketId;
        delete state.players[socketId];
    }

    return {
        state,
        addPlayer, removePlayer
    }

}