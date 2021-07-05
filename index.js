const http = require('http')
const express = require('express')
const app = express()
const server = http.createServer(app)
const { Server } = require("socket.io")
const io = new Server(server)

app.use(express.static("public"))

let users = 0
let count = 0

io.on('connection', (socket) => {
    socket.lastCount = 0;
    socket.emit('count', count)
    users += 1;
    console.log(`a user connected (users = ${users})`)
    socket.on('disconnect', () => {
        users -= 1
        console.log(`a user disconnected (users = ${users})`)
    });
    socket.on('pressed', () => {
        let curTime = new Date().getTime();
        if ((curTime - socket.lastCount) < 100) return;
        socket.lastCount = curTime
        count += 1
        socket.emit('count', count)
        socket.broadcast.emit('count', count)
        console.log('Count = ' + count)
    })
});

server.listen(80)