const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');
const publicPath = path.join(__dirname, '../public');

var app = express();
const port = process.env.PORT || 3000;
var server = http.createServer(app)
var io = socketIO(server);


app.use(express.static(publicPath));

io.on('connection', (socket)=>{
    console.log('new user aaya bro');

    socket.emit('welcome', {
        from: 'admin',
        text: 'Welcome man. How\'s it hangin\'?',
        createdAt: new Date().getTime()
    });

    socket.broadcast.emit('new one', {
        from :'admin',
        text: 'ek aur aaya',
        createdAt: new Date().getTime()
    })


    socket.on('createMessage', (msg)=>{
        console.log(msg);
        io.emit('newMessage', {
            from: msg.from,
            text: msg.text,
            createdAt: new Date().getTime()
        });

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