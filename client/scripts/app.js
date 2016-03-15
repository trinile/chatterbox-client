// YOUR CODE HERE:

var app = {};
app.server = 'https://api.parse.com/1/classes/messages';
app.init = function() {
};

app.send = function(message) {
  $.ajax({
    url: app.server,
    type: 'POST',
    data: JSON.stringify(message),
    contentType: 'application/json',
    success: function (data) {
      console.log('chatterbox: Message sent');
    },
    error: function (data) {
      // See: https://developer.mozilla.org/en-US/docs/Web/API/console.error
      console.error('chatterbox: Failed to send message', data);
    }
  });
};

app.fetch = function() {
  $.ajax({
    url: app.server,
    type: 'GET',
    success: function(data) { appendChatBox(data); },
    error: function(error) {
      console.error(error);
    }
  });
};

app.clearMessages = function() {
  $('#chats').html('');
};

app.addMessages = function(message) {

};


app.escapeHTML = function(text) {
  if (text === undefined) {
    return 'no message~~~~';
  }
  return text.replace(/[-[\]{}*+\\^$|#\s<>"]/g, '\\$&');
};

var appendChatBox = function(data) {
  var arr = data.results;
  _.each(arr, function(message, key) {
    var user = message.username;
    var text = message.text;
    var html = '<div class="chat"><span class="username">' + app.escapeHTML(user) + ':' + '</span>'
            + '<div class="text">Message: ' + app.escapeHTML(text) + 
            '</div>' + key + '</div>';
    $('#chats').append(html).fadeIn();
  });

  setTimeout(function() {
    app.clearMessages();
    app.fetch();
  }, 5000);
};

app.addRoom;

app.fetch();
//Escaping &, <, >, ", ', `, , !, @, $, %, (, ), =, +, {, }, [, and ] is almost enough


//remember username
//write new messages
$(document).ready(function() {
  $('.form').submit(function(e) {
    var message = $('input:first').val();
    console.log(message);
  }); 
});



