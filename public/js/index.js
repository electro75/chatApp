
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

var locationButton = $('#send-location');
locationButton.click(function () {
    if(!navigator.geolocation) {
        return alert('Geolocation not supported by your browser');
    }

    navigator.geolocation.getCurrentPosition(function(position){
        console.log(position);
        socket.emit('createLocationMessage', {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
        })
    }, function() {
        return alert('Unable to fetch location');
    })
})

socket.on('newLocationMessage', function(message) {
    var li = $('<li></li>');
    var a = $('<a target="_blank"  >My Lokesh</a>');

    li.text(`${message.from}: `);
    a.attr('href', message.url);
    li.append(a);
    $('#messages').append(li);
})