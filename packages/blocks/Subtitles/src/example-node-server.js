const express = require("express");
const socket = require("socket.io");

// App setup
const PORT = 5000;
const app = express();
const server = app.listen(PORT, function () {
  console.log(`Listening on port ${PORT}`);
  console.log(`http://localhost:${PORT}`);
});

// Socket setup
const io = socket(server);

io.on("connection", function (socket) {
    console.log("Made socket connection");
    socket.emit('connected', socket.id);
    socket.on('transcript', data => {
        console.log('data: ', data);
        socket.emit('transcript', data);
    })
    socket.on('transcriptCompleted', data => {
        console.log('transcriptCompleted: ', data);
    })
});

