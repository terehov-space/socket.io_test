const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require('socket.io');
const io = new Server(server);

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/page.html');
});

io.on('connection', (socket) => {
    console.log('new connection');
    socket.on('disconnect', () => {
        console.log('connection is closed');
    });

    socket.on('newMessage', (msg) => {
        io.emit('incomingMessage', msg);
    })
})

server.listen(3000, () => {
    console.log('server started');
});