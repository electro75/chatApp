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
    socket.on('disconnect', ()=>{
        console.log('gaya user');
    })
})

server.listen(port, ()=>{
    console.log(`started up at ${port}`)
})