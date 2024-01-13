// index.js
import { addUser, removeUser, getUser,users } from './userstate.js';
import { Server } from 'socket.io';

const io = new Server(9000, {
    cors: {
        origin: 'http://localhost:3000',
    }, 
})

io.on('connection', (socket) => {
  console.log('user connected');

  // Connect
  socket.on('addUser', (userData) => {
    addUser(userData, socket.id);
    io.emit('getUsers', users);
  });

  // Send message
  socket.on('sendMessage', (data) => {
    const user = getUser(data.receiverId);
    console.log(data);
    console.log(user);

    // Check if the user is found and has a socketId before emitting the message
    if (user && user.socketId) {
      io.to(user.socketId).emit('getMessage', data);
    } else {
      console.log(`User with ID ${data.receiverId} not found or has no socketId`);
    }
  });

  // Disconnect
  socket.on('disconnect', () => {
    console.log('user disconnected');
    removeUser(socket.id);
    io.emit('getUsers', users);
  });
});
