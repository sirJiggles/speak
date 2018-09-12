const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const bodyParser = require('body-parser');
const fetch = require('node-fetch');

app.use(express.static('public'));

// ALLOW CORS, FOR NOW
app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  );
  next();
});

app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

var apis = require('./routes/apis');
app.use('/', apis);

io.on('connection', function(socket) {
  socket.on('chat message', async function(msg) {
    const postMessage = {
      query: msg,
      sessionId: socket.client.id,
      v: 20150910,
      lang: 'en-US',
      name: 'testEventName'
    };

    try {
      const response = await fetch('https://api.dialogflow.com/v1/query', {
        method: 'POST',
        body: JSON.stringify(postMessage),
        headers: {
          Authorization: 'Bearer 963ff2192a68441d88043d032358fef6',
          'Content-Type': 'application/json'
        }
      });

      const data = await response.json();

      socket.emit('bot reply', data.result.speech);
    } catch (err) {
      console.error(err);
    }
  });
});

http.listen(3000, () => console.log('Server running on http://localhost:3000'));

// module.exports = app;
