import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';
import cors from 'cors';

const app = express();
const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"]
  }
});

app.use(cors());
app.use(express.json());

// Store messages in memory (in production, use a database)
let messages = [];
let users = new Map();

io.on('connection', (socket) => {
  console.log('User connected:', socket.id);

  // Send existing messages to new user
  socket.emit('message_history', messages);
  
  // Send current user count
  io.emit('user_count', users.size + 1);

  socket.on('user_join', (userData) => {
    users.set(socket.id, userData);
    console.log(`${userData.username} joined the chat`);
    
    // Broadcast user joined message
    const joinMessage = {
      id: Date.now().toString(),
      username: 'System',
      message: `${userData.username} joined the chat`,
      timestamp: new Date().toISOString(),
      type: 'system'
    };
    
    messages.push(joinMessage);
    io.emit('new_message', joinMessage);
    io.emit('user_count', users.size);
  });

  socket.on('send_message', (messageData) => {
    const user = users.get(socket.id);
    if (!user) return;

    const message = {
      id: Date.now().toString(),
      username: user.username,
      message: messageData.message,
      timestamp: new Date().toISOString(),
      type: 'user'
    };

    messages.push(message);
    
    // Keep only last 100 messages
    if (messages.length > 100) {
      messages = messages.slice(-100);
    }

    io.emit('new_message', message);
  });

  socket.on('user_typing', (userData) => {
    socket.broadcast.emit('user_typing', userData);
  });

  socket.on('user_stop_typing', (userData) => {
    socket.broadcast.emit('user_stop_typing', userData);
  });

  socket.on('disconnect', () => {
    console.log('User disconnected:', socket.id);
    const user = users.get(socket.id);
    
    if (user) {
      // Broadcast user left message
      const leaveMessage = {
        id: Date.now().toString(),
        username: 'System',
        message: `${user.username} left the chat`,
        timestamp: new Date().toISOString(),
        type: 'system'
      };
      
      messages.push(leaveMessage);
      io.emit('new_message', leaveMessage);
      users.delete(socket.id);
    }
    
    io.emit('user_count', users.size);
  });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});