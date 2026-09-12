import http from 'http';
import dotenv from 'dotenv';
import { Server } from 'socket.io';
import app from './app';
import { connectDB } from './config/db';

// Load environment variables
dotenv.config();

const PORT = process.env.PORT || 5000;

// Create HTTP Server
const server = http.createServer(app);

import { handleSocketEvents } from './sockets/socket.handler';

// Initialize Socket.IO
const io = new Server(server, {
  cors: {
    origin: '*', // Configure properly in production
    methods: ['GET', 'POST']
  }
});

// Attach socket event handlers
handleSocketEvents(io);

const startServer = async () => {
  // 1. Connect to Database
  await connectDB();

  // 2. Start HTTP & Socket Server
  server.listen(PORT, () => {
    console.log(`[SERVER] DhobiGo API is running on http://localhost:${PORT}`);
  });
};

startServer();
