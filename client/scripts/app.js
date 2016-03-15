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

app.fetch();

//createdAt:
//objectId:
//roomname:
//username
//text

// var chatBox = function(data) {
//   //html for messages
//   var html = '<div><span>' + data.username + '</span>'
//             + '<span>' + data.text + 
//             '</span></div>';

//   return html;
// }

var escapeHTML = function(text) {
  if (text === undefined) {
    return 'no message~~~~';
  }
  return text.replace(/[-[\]{}*+\\^$|#\s<>"]/g, '\\$&');
};

var appendChatBox = function(data) {
  var arr = data.results;
  _.each(arr, function(message) {
    var user = message.username;
    var text = message.text;
    // escapeHTML(user);
    // escapeHTML(text);
    var html = '<div class="chat"><span class="username">' + escapeHTML(user) + '</span>'
            + '<span class="text">' + escapeHTML(text) + 
            '</span></div>';
    
    console.log('user: ' + escapeHTML(user), 'text: ', escapeHTML(text));

    $('#chats').prepend(html);
  });

  setTimeout(function() {
    app.fetch();
  },5000);
};


//Escaping &, <, >, ", ', `, , !, @, $, %, (, ), =, +, {, }, [, and ] is almost enough





