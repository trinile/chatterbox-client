// YOUR CODE HERE:

var app = {};
app.server = 'https://api.parse.com/1/classes/messages';
app.init = function() {
  app.room = 'lobby';
  app.fetch();
};

app.send = function(message) {
  $.ajax({
    url: app.server,
    type: 'POST',
    data: JSON.stringify(message),
    contentType: 'application/json',
    success: function (data) {
      console.log('chatterbox: Message sent:', data);
    },
    error: function (data) {
      console.error('chatterbox: Failed to send message', data);
    }
  });
};

app.fetch = function() {
  $.ajax({
    url: app.server,
    type: 'GET',
    success: function(data) { app.addAllChats(data.results); },
    error: function(error) {
      console.error(error);
    }
  });
};

app.clearMessages = function() {
  $('#chats').html('');
};


app.escapeHTML = function(text) {
  if (text === undefined) {
    return 'user';
  }
  return text.replace(/[-[\]{}*+\\^$|#\s<>"]/g, '\\$&');
};

///////////////////

app.addMessage = function(message) {
  //message has username, roomname, text
  var user = message.username;
  var text = message.text;
  var roomname = message.roomname;
  var html = '<div class="chat"><span class="' + roomname + ' lobby"</span>' + app.escapeHTML(user) + ':' + '</span>'
          + '<div class="text">Message: ' + app.escapeHTML(text) + 
          '</div>';
  $('#chats').append(html).fadeIn();
  //add rooms to the DOM for rooms that exist
  // if (roomname) {
  //   app.addRoom(roomname);
  // }
};

app.addAllChats = function(data) {
  var currentRoom = app.room;

  _.each(data, function(message) {
    if (app.room === 'lobby') {
      app.addMessage(message);
    } else if (message.roomname === app.room) {
      app.addMessage(message);
    }
  });

  setTimeout(function() {
    app.clearMessages();
    app.fetch();
  }, 5000);
};

/////////////////////////////


app.addRoom = function(room) {
  if (room === 'New room...') {
    var newRoom = prompt('What room do you want to add??');
    room = newRoom;
  }
  $('#roomSelect').append('<option>' + room + '</option>');
};

app.init();

$(document).ready(function() {
  $('#submit').on('click', function(event) {
    var message = { };
    message.username = window.location.search.replace('?username=', '');
    message.text = $('#input-value').val();
    message.roomname = app.room;
    // message.roomname = 
    event.preventDefault();
    app.send(message);
    console.log(message);
  });


  //selecting a room
  $('#roomSelect').change(function() {
    var room = $(this).find('option:selected').text();  
    if (room === 'New room') {
      app.addRoom(room);
    } else {
      app.room = room;
    }
  });
});

// app.addRoom('lobby');

