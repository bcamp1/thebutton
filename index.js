const http = require('http')
const express = require('express')
const app = express()
const server = http.createServer(app)
const { Server } = require("socket.io")
const io = new Server(server)
const port = 8080
const fs = require('fs')

const backupInterval = 10_000

app.use(express.static("public"))

let users = 0
let count = 0

fs.readFile("count.txt", "utf-8", (err, data) => {
    if (err) { 
        count = 0
    } else {
        count = parseInt(data)
    }
})

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
        if ((curTime - socket.lastCount) < 100) {
            console.log('Count too fast. Invalidated')
            return
        }
        socket.lastCount = curTime
        count += 1
        socket.emit('count', count)
        socket.broadcast.emit('count', count)
        console.log('Count = ' + count)
    })
});

server.listen(port)
console.log('Listening on port ' + port + '...')

// File backup loop
function backupCount() {
    fs.writeFile("count.txt", count.toString(), (err) => {
        if (err) console.log(err)
        console.log("Backup successful")
    })
}

setInterval(backupCount, backupInterval)