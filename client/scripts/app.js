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
    success: function(data) {
      console.log('success');
      console.log(data);
    },
    error: function(error) {
      console.error(error);
    }
  });
  console.log('hello');
};


var successFunction = function() {
  //append to html

};