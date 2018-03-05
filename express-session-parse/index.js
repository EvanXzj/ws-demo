const session = require('express-session')
const express = require('express')
const http = require('http')
const uuid = require('uuid')

const WebSocket = require('ws')

const app = express()

const sessionParser = session({
    saveUninitialized: false,
    secret: '$eCuRiTy',
    resave: false
})

app.use(express.static('public'))
app.use(sessionParser)

app.post('/login', (req,res)=> {
    const id = uuid.v4()

    console.log(`Updating session for user ${id}`)
    req.session.userId = id

    res.send({result: 'OK', message: 'Session updated'})
})

app.delete('/logout', (req, res) => {
    console.log('Destroying session')
    req.session.destroy()

    res.send({result: 'OK', message: 'Session destroyed'})
})

const server = new http.createServer(app)

const wss = new WebSocket.Server({
    verifyClient: (info, done) => {
        console.log('Parsing session from request...')
        sessionParser(info.req, {}, () => {
            console.log('Session is parsed')
            console.dir(info)
            done(info.req.session.userId)
        })
    },
    server
})

wss.on('connection', (ws,req) => {
    ws.on('message', message => {
        console.log(`WS message ${message} from user ${req.session.userId}`)

        if (message === 'close') {
            wss.close(() => {
                console.log('Server Close')
            })
        }
    })
    ws.send('Hello from server')
})

wss.on('error', (err) => {
    console.log(err.message)
})

wss.on('headers', (headers, req) => {
    console.log(headers, req)
})

wss.on('listening', () => {
    console.log('Server has been bound')
})


server.listen(8080)