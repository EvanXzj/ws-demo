const WebSocket = require('ws');

const wss = new WebSocket.Server({port: 3000, clientTracking: true});

wss.on('connection', function connection(ws, req) {
    ws.on('message', function incoming(data) {
        console.log(`received: ${data}, ip: ${req.connection.remoteAddress}`)
    });

    ws.send('something from server');
    console.log(wss.clients)
})

