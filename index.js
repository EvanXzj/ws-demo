const WebSocket = require('ws');

const ws = new WebSocket('http://127.0.0.1:3000');

ws.on('open', function open() {
    ws.send('something from client');
});

ws.on('message', function incoming(data) {
    console.log(data);
})