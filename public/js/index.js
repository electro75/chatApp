var socket = io();
socket.on('connect', function(){
    console.log('connected to server');

})

socket.on('welcome', function(msg){
    console.log(msg.text)
})

socket.on('new one', function(msg){
    console.log(msg.text);
})

socket.on('disconnect', function(){
    console.log('Disconnected from server');
})

socket.on('newMessage', function(msg){
    console.log(msg.text);
})

