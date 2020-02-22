const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const port = process.env.PORT || 3000;

app.use(express.static(__dirname + '/public'));

//receiving scrolling height
io.on('connection', function(socket){
  socket.on('scrolling', function(height){
    console.log('height: ' + height);
    io.emit('scrolling', height);
  });
});

// io.on('connection', onConnection);

http.listen(port, () => console.log('listening on port ' + port));