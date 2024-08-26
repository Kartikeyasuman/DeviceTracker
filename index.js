const express = require('express');
const app = express();
const http = require('http');
const path = require('path');
const { disconnect } = require('process');
const socketio = require('socket.io');
const server = http.createServer(app);
const io = socketio(server);

require("dotenv").config();
app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));

io.on("connection", function (socket) {
    socket.on("send-location", function (data) {
        io.emit('receive-location', { id: socket.id, ...data });
    });
    socket.on("disconnect", function () {
        io.emit("user-disconnected", socket.id)
    })
    console.log("connected");
});


app.get('/', (req, res) => {
    res.render('index'); // 'index' should be a string
});
const PORT = process.env.PORT || 1001
server.listen(PORT, () => {
    console.log('Server is running on port 1000');
});
