import { create } from 'zustand';
import { io } from 'socket.io-client';

// Replace with your actual backend URL in production
const SOCKET_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

const useSocketStore = create((set, get) => ({
  socket: null,
  isConnected: false,
  applicationStatus: null,
  connect: () => {
    if (!get().socket) {
      const socket = io(SOCKET_URL);
      
      socket.on('connect', () => {
        set({ isConnected: true });
        console.log('Connected to WebSocket server');
      });

      socket.on('disconnect', () => {
        set({ isConnected: false });
        console.log('Disconnected from WebSocket server');
      });

      set({ socket });
    }
  },
  disconnect: () => {
    const { socket } = get();
    if (socket) {
      socket.disconnect();
      set({ socket: null, isConnected: false });
    }
  },
  // Example listener setup
  listenForApplicationUpdates: (userId) => {
    const { socket } = get();
    if (socket && userId) {
      socket.on(`application_updated_${userId}`, (app) => {
        set({ applicationStatus: app });
      });
    }
  }
}));

export default useSocketStore;
