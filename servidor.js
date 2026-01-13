// servidor.js
const WebSocket = require('ws');

// Cria o servidor na porta 8080
const wss = new WebSocket.Server({ port: 8080 });

console.log("Servidor de chat rodando na porta 8080...");

wss.on('connection', (ws) => {
    ws.on('message', (message) => {
        // Quando recebe uma mensagem de alguém...
        console.log('Recebido: %s', message);

        // Envia para TODOS os outros conectados
        wss.clients.forEach((client) => {
            if (client !== ws && client.readyState === WebSocket.OPEN) {
                client.send(message.toString());
            }
        });
    });
});
