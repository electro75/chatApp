
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
    var formattedTime = moment(msg.createdAt).format('h:mm a')
    var li = $('<li></li>');
    li.text(`${msg.from} ${formattedTime}: ${msg.text}`);
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
    var messageTextBox = $('[name = message]');

    socket.emit('createMessage', {
        from: 'User',
        text:  messageTextBox.val()
    }, function(){
        messageTextBox.val('');
    })
})

var locationButton = $('#send-location');
locationButton.click(function () {
    if(!navigator.geolocation) {
        return alert('Geolocation not supported by your browser');
    }
    locationButton.attr('disabled', 'disabled').text('Bhejra..rukk jara');

    navigator.geolocation.getCurrentPosition(function(position){
        locationButton.removeAttr('disabled').text('Send Location');
        socket.emit('createLocationMessage', {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
        })
    }, function() {
        locationButton.removeAttr('disabled').text('Send Location');
        return alert('Unable to fetch location');
    })
})

socket.on('newLocationMessage', function(message) {
    var formattedTime = moment(msg.createdAt).format('h:mm a');
    var li = $('<li></li>');
    var a = $('<a target="_blank"  >My Lokesh</a>');

    li.text(`${message.from} ${formattedTime}: `);
    a.attr('href', message.url);
    li.append(a);
    $('#messages').append(li);
})