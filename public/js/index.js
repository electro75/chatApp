
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
    var li = $('<li></li>');
    li.text(`${msg.from}: ${msg.text}`);
    $('#messages').append(li);

})

// socket.emit('createMessage', {
//     from: 'Kapil',
//     text: 'shahar'
// }, function(serverMessage) {
//     console.log(serverMessage);
// })

$('#message').on('submit', function(e){
    e.preventDefault();
    socket.emit('createMessage', {
        from: 'User',
        text: $('[name = message]').val()
    }, function(){

    })
})