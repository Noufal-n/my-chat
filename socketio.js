

const io=require("socket.io")();
const socketio={
io:io
}

const connectedSockets = new Map();


io.on('connection', (socket) => {
  console.log('user connected')

  connectedSockets.set(socket.id, socket);

  socket.on('sms', function (msg, room) {
    if (!room) {
      socket.broadcast.emit('sms', msg, socket.id)
    } else {
      socket.to(room).emit('sms', msg, socket.id)
    }


  })


  socket.on('disconnect', () => {
    connectedSockets.delete(socket.id);
    io.emit('online-person', Array.from(connectedSockets.keys()));
  });

  io.emit('online-person', Array.from(connectedSockets.keys()));
})

module.exports=socketio;


