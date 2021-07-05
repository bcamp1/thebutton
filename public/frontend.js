var socket = io()

document.getElementById("button").onclick = () => {
    socket.emit('pressed')
}

socket.on('count', (updatedCount) => {
    document.getElementById("number").textContent = updatedCount.toString()
})

addEventListener("mousedown", function (event) {
    if (event.target.setAttribute) {
        event.target.setAttribute("data-active", "");
    }
}, true);

addEventListener("mouseup", function (event) {
    if (event.target.removeAttribute) {
        event.target.removeAttribute("data-active");
    }
}, true);