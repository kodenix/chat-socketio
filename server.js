const path = require('path');
const express = require('express');
const app = express();
const { Server } = require("socket.io");


app.set('port', process.env.PORT || 3000);

app.use(express.static(path.join(__dirname, 'public')));

const server = app.listen(app.get('port'), () => {
  console.log('server listen on port', app.get('port'));
})

const io = new Server(server);

io.on('connection', (socket) => {
  console.log('a user connected');

  socket.on('chat message', (msgObj) => {
    console.log('message: ' + msgObj);
    io.emit('chat message', msgObj);
  });
  
  socket.on('disconnect', () => {
    console.log('user disconnected');
  });

  

  
});

