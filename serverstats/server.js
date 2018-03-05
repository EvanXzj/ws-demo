const WebSocketServer = require('ws').Server
const express = require('express')
const path = require('path')
const app = express()
const server = require('http').createServer()

app.use(express.static(path.join(__dirname, '/public')));

const wss = new WebSocketServer({server: server})

wss.on('connection', function(ws) {
    let id = setInterval(function() {
        ws.send(JSON.stringify(process.memoryUsage())), function() {}
    }, 100)

    console.log('started client interval')

    ws.on('close', function() {
        console.log('stopping client interval');
        clearInterval(id);
    })
})

server.on('request', app);

server.listen(3000, function() {
    console.log('Server running at http://localhost:3000')
})