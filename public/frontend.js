var socket = io()

document.getElementById("button").onclick = () => {
    socket.emit('pressed')
}

socket.on('count', (updatedCount) => {
    document.getElementById("number").textContent = updatedCount.toString()
})