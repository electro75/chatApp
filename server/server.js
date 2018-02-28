const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');
const publicPath = path.join(__dirname, '../public');

const { generateMessage } = require('./utils/message');

var app = express();
const port = process.env.PORT || 3000;
var server = http.createServer(app)
var io = socketIO(server);


app.use(express.static(publicPath));

io.on('connection', (socket)=>{
    console.log('new user aaya bro');

    socket.emit('welcome', generateMessage('Admin', 'Welcome to the chat app'));

    socket.broadcast.emit('new one', generateMessage('Admin', 'New User Joined'));


    socket.on('createMessage', (msg, callback)=>{
        console.log(msg);
        io.emit('newMessage', generateMessage(msg.from, msg.text));
        callback('this is from the server');

        // socket.broadcast.emit('newMessage', {
        //     from: msg.from,
        //     text: msg.text,
        //     createdAt: new Date().getTime() 
        // })
    })

    socket.on('disconnect', ()=>{
        console.log('gaya user');
    })
})

server.listen(port, ()=>{
    console.log(`started up at ${port}`)
})