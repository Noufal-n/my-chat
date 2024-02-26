const express = require('express')
const path = require('path')
const app = express()
const passport = require('passport')
const http = require('http')
const server = http.createServer(app)
const { Server } = require("socket.io")
const io = new Server(server)
require('./google-authintication/Oauth')
app.use(passport.initialize());
app.use(passport.session());

// view engine setup
app.set('view engine', 'hbs', 'html');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')))



const connectedSockets = new Map();

app.get('/', function (req, res) {

  res.render('login');

})







app.get('/chat', (req, res) => {

  res.render('chat')
})

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


server.listen(3000, function () {

})