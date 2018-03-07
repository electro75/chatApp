const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');
const publicPath = path.join(__dirname, '../public');

const { generateMessage } = require('./utils/message');
const { generateLocationMessage } = require('./utils/message');
const { isRealString } = require('./utils/validation');
const { Users } =  require('./utils/users');

var app = express();
const port = process.env.PORT || 3000;
var server = http.createServer(app)
var io = socketIO(server);
var users = new Users();

app.use(express.static(publicPath));

io.on('connection', (socket)=>{
    console.log('new user aaya bro');

    
    socket.on('join', (params, callback)=>{
        if(!isRealString(params.name) || !isRealString(params.room) ) {
            return callback('Name and room are required');
        }

        socket.join(params.room);
        users.removeUser(socket.id);
        users.addUser(socket.id, params.name, params.room);

        io.to(params.room).emit('updateUserList', users.getUserList(params.room));
        socket.emit('welcome', generateMessage('Admin', `Welcome to ${params.room} bro`));
        socket.broadcast.emit('new one', generateMessage('Admin', `${params.name} Joined`));

        callback();
    })



    socket.on('createMessage', (msg, callback)=>{
        var user = users.getUser(socket.id);

        if(user && isRealString(msg.text)) {
            io.to(user.room).emit('newMessage', generateMessage(user.name, msg.text));
        }
        
        callback();
    })

    socket.on('createLocationMessage', (coords)=>{
        var user = users.getUser(socket.id);

        if(user) {
            io.to(user.room).emit('newLocationMessage', generateLocationMessage(user.name, coords.latitude, coords.longitude))
        }
        
    })

    socket.on('disconnect', ()=>{
        var user = users.removeUser(socket.id);

        if(user) {
            io.to(user.room).emit('updateUserList', users.getUserList(user.room));
            io.to(user.room).emit('newMessage', generateMessage('Admin', `${user.name} has left the room`));
        }
    })
})

server.listen(port, ()=>{
    console.log(`started up at ${port}`)
})