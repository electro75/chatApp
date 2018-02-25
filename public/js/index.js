var socket = io();
socket.on('connect', function(){
    console.log('connected to server');

    socket.emit('createMessage',{
        from: 'kopa4',
        text: 'kasa aahes'
    })
})

socket.on('disconnect', function(){
    console.log('Disconnected from server');
})

socket.on('newMessage', function(msg){
    console.log(msg);
})

