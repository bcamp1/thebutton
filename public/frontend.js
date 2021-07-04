var socket = io()

let count = 0;

document.getElementById("button").onclick = () => {
    count += 1;
    socket.emit('pressed')
    document.getElementById("number").textContent = count.toString()
}

socket.on('count', (updatedCount) => {
    count = updatedCount;
    document.getElementById("number").textContent = count.toString()
})