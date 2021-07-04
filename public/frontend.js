var socket = io()

let count = 0;

document.getElementById("button").onclick = () => {
    socket.emit('pressed')
}

socket.on('count', (updatedCount) => {
    count = updatedCount;
    document.getElementById("number").textContent = count.toString()
})