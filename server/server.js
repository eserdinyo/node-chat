const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const { generateMessage, generateLocationMessage } = require('./utils/message');
const { isRealString } = require('./utils/validation');
const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;
const app = express();
const server = http.createServer(app);
const io = socketIO(server);

app.use(express.static(publicPath));

io.on('connection', socket => {

    socket.on('join', (params, callback) => {
        if (!isRealString(params.name) || !isRealString(params.room)) {
            callback('Name and room name are required.');
        }

        socket.join(params.room);

        socket.emit('newMessage', generateMessage('Admin', 'Welcome to the chat app!'));
        socket.broadcast.to(params.room).emit('newMessage', generateMessage('Admin', `${params.name} has joined.`));
        callback();
    })

    socket.on('createMessage', (message, callback) => {
        io.emit('newMessage', generateMessage(message.from, message.text));
        callback("This is from server.");
    });

    socket.on('createLocationMsg', (coords) => {
        io.emit('newLocationMsg', generateLocationMessage('Admin', coords.lat, coords.lng))
    })

    socket.on('disconnect', () => {
        console.log('User was disconnected');
    })
})

server.listen(port, () => {
    console.log('Server up on port ', port);
})