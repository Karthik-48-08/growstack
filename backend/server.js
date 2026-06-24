import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import { createServer } from 'http';
import { Server } from 'socket.io';
import connectDB from './src/config/db.js';
import authRoutes from './src/routes/authRoutes.js';

dotenv.config();

// Connect to database
connectDB();

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE']
  }
});

// Middleware to inject io into routes
app.use((req, res, next) => {
  req.io = io;
  next();
});

import programRoutes from './src/routes/programRoutes.js';
import applicationRoutes from './src/routes/applicationRoutes.js';

// Middlewares
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/programs', programRoutes);
app.use('/api/applications', applicationRoutes);

app.get('/', (req, res) => {
  res.send('GrowStack API is running...');
});

// Socket.io Connection
io.on('connection', (socket) => {
  console.log('New client connected:', socket.id);
  
  socket.on('disconnect', () => {
    console.log('Client disconnected:', socket.id);
  });
});

const PORT = process.env.PORT || 5000;

httpServer.listen(PORT, () => {
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
});
