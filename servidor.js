const WebSocket = require('ws');
const wss = new WebSocket.Server({ port: 8080 });

wss.on('connection', (ws) => {
    console.log("Alguém entrou no chat!");

    ws.on('message', (rawData) => {
        // IMPORTANTE: Transformar o que chega em texto legível
        const message = rawData.toString();
        console.log("Recebido:", message);

        // Reenviar para TODO MUNDO (inclusive para quem enviou)
        wss.clients.forEach((client) => {
            if (client.readyState === WebSocket.OPEN) {
                client.send(message);
            }
        });
    });
});
