(function($){
    $.deparam = $.deparam || function(uri){
      if(uri === undefined){
        uri = window.location.search;
      }
      var queryString = {};
      uri.replace(
        new RegExp(
          "([^?=&]+)(=([^&#]*))?", "g"),
          function($0, $1, $2, $3) {
              queryString[$1] = decodeURIComponent($3.replace(/\+/g, '%20'));
          }
        );
        return queryString;
      };
  })($);
  
var socket = io();
socket.on('connect', function(){
    var params = $.deparam(window.location.search) 
    
    socket.emit('join', params, function(err){
        if(err) {
            alert(err);
            window.location.href='/'
        } else {
            console.log('no err')
        }
    })
})

function scrollToBottom() {
    //Selectors
    var messages = $('#messages');
    var newMessage = messages.children('li:last-child')
    // Heights
    var clientHeight = messages.prop('clientHeight');
    var scrollTop = messages.prop('scrollTop');
    var scrollHeight = messages.prop('scrollHeight');
    var newMessageHeight = newMessage.innerHeight();
    var lastMessageHeight = newMessage.prev().innerHeight();

    if (clientHeight + scrollTop + newMessageHeight + lastMessageHeight >= scrollHeight ) {
        messages.scrollTop(scrollHeight);
    }
}

socket.on('welcome', function(msg){
    console.log(msg.text)
})

socket.on('new one', function(msg){
    console.log(msg.text);
})

socket.on('disconnect', function(){
    console.log('Disconnected from server');
})

socket.on('updateUserList', function(users){
    var ol = $('<ol></ol>');

    users.forEach((user)=>{
        ol.append($('<li></li>').text(user));
    })

    $('#users').html(ol);
})


//new message listener
socket.on('newMessage', function(msg){
    var formattedTime = moment(msg.createdAt).format('h:mm a')
    var template = $('#message-template').html();
    var html = Mustache.render(template, {
        text: msg.text,
        from: msg.from,
        createdAt: formattedTime
    });

    $('#messages').append(html);
    scrollToBottom();
    
    // var li = $('<li></li>');
    // li.text(`${msg.from} ${formattedTime}: ${msg.text}`);
    // $('#messages').append(li);

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


//Send Location Event Listener
socket.on('newLocationMessage', function(msg) {
    var formattedTime = moment(msg.createdAt).format('h:mm a');
    var template = $('#location-message-template').html();
    var html = Mustache.render(template, {
        url: msg.url,
        from: msg.from,
        createdAt: formattedTime
    });

    $('#messages').append(html);
    scrollToBottom();
    // var li = $('<li></li>');
    // var a = $('<a target="_blank"  >My Lokesh</a>');

    // li.text(`${message.from} ${formattedTime}: `);
    // a.attr('href', message.url);
    // li.append(a);
    // $('#messages').append(li);
})