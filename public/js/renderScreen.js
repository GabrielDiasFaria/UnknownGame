export default function renderScreen(screen, socket) {

    const context = screen.getContext("2d"); // Contexto da Tela
    context.fillStyle = 'white';

    function render(state) {
        context.clearRect(0, 0, state.screen.width, state.screen.height);

        for (const playerId in state.players) {
            if (socket.id != playerId)
                return

            const player = state.players[playerId];

            // DRAW LAYER 0
            for (let y = 0; y < player.viewMap.layer0.length; y++) {
                let yTiles = player.viewMap.layer0[y]
                for (let x = 0; x < yTiles.length; x++) {
                    let xTiles = yTiles[x]

                    var image = new Image()
                    image.src = state.config.pathAssetTileSet + player.viewMap.Assets[xTiles];

                    context.drawImage(
                        image,     // Imagem
                        0, // X Captura caso seja varios em um imagem só
                        0, // Y Captura caso seja varios em uma imagem só
                        state.screen.sizeGlobalX, // Tamanho da Imagem
                        state.screen.sizeGlobalY,// Tamanho da Imagem
                        x * state.screen.sizeGlobalX,     // X Inicio da Imagem
                        y * state.screen.sizeGlobalX,     // Y Inicio da Imagem
                        state.screen.sizeGlobalX, // Tamanho da Imagem
                        state.screen.sizeGlobalY // Tamanho da Imagem
                    )
                }
            }

            // DRAW PLAYER
            var image = new Image()
            image.src = state.config.pathAssetOutfit + player.outfit;

            context.fillStyle = "white";

            context.drawImage(
                image,     // Imagem
                player.clipX, // X Captura caso seja varios em um imagem só
                player.clipY, // Y Captura caso seja varios em uma imagem só
                state.screen.sizeGlobalX, // Tamanho da Imagem
                state.screen.sizeGlobalY,// Tamanho da Imagem
                player.x,     // X Inicio da Imagem
                player.y,     // Y Inicio da Imagem
                state.screen.sizeGlobalX, // Tamanho da Imagem
                state.screen.sizeGlobalY // Tamanho da Imagem
            )

        }

    }



    return { render }
}