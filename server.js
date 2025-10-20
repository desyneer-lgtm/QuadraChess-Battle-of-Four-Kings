const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const path = require('path');

const app = express();
const server = http.createServer(app);
const io = new Server(server, { cors: { origin: '*' } });

app.use(express.static(path.join(__dirname, 'web')));

io.on('connection', socket => {
  console.log('Player connected:', socket.id);
  socket.on('move', data => io.emit('move', data));
  socket.on('disconnect', () => console.log('Player disconnected:', socket.id));
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => console.log(`QuadraChess server running on port ${PORT}`));
