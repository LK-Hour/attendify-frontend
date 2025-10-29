// WebSocket service for real-time updates
// import { io, Socket } from 'socket.io-client';

export type NotificationType = 'attendance' | 'session' | 'system' | 'alert';

export interface Notification {
  id: string;
  type: NotificationType;
  title: string;
  message: string;
  timestamp: number;
  read: boolean;
}

class WebSocketService {
  // private socket: Socket | null = null;
  private connected: boolean = false;
  private listeners: Map<string, Function[]> = new Map();

  /**
   * Connect to WebSocket server
   */
  connect(_token: string): void {
    // In production, use real socket.io:
    /*
    this.socket = io(import.meta.env.VITE_WS_URL || 'ws://localhost:3001', {
      auth: { token },
      transports: ['websocket'],
    });

    this.socket.on('connect', () => {
      this.connected = true;
      this.emit('connection_status', { connected: true });
    });

    this.socket.on('disconnect', () => {
      this.connected = false;
      this.emit('connection_status', { connected: false });
    });

    this.socket.on('notification', (data: Notification) => {
      this.emit('notification', data);
    });

    this.socket.on('attendance_update', (data) => {
      this.emit('attendance_update', data);
    });

    this.socket.on('session_update', (data) => {
      this.emit('session_update', data);
    });
    */

    // Mock implementation
    this.connected = true;
    console.log('WebSocket connected (mock mode)');
  }

  /**
   * Disconnect from WebSocket server
   */
  disconnect(): void {
    // this.socket?.disconnect();
    this.connected = false;
    this.listeners.clear();
  }

  /**
   * Check connection status
   */
  isConnected(): boolean {
    return this.connected;
  }

  /**
   * Subscribe to event
   */
  on(event: string, callback: Function): void {
    if (!this.listeners.has(event)) {
      this.listeners.set(event, []);
    }
    this.listeners.get(event)!.push(callback);
  }

  /**
   * Unsubscribe from event
   */
  off(event: string, callback: Function): void {
    const listeners = this.listeners.get(event);
    if (listeners) {
      const index = listeners.indexOf(callback);
      if (index > -1) {
        listeners.splice(index, 1);
      }
    }
  }

  /**
   * Emit event to listeners
   * Used in production mode when uncommented
   */
  // @ts-ignore - Used in production socket.io code (commented out for dev)
  private emit(event: string, data: any): void {
    const listeners = this.listeners.get(event);
    if (listeners) {
      listeners.forEach((callback) => callback(data));
    }
  }

  /**
   * Send message to server
   */
  send(event: string, data: any): void {
    // this.socket?.emit(event, data);
    console.log('WebSocket send:', event, data);
  }

  /**
   * Join room (for real-time session updates)
   */
  joinRoom(roomId: string): void {
    this.send('join_room', { roomId });
  }

  /**
   * Leave room
   */
  leaveRoom(roomId: string): void {
    this.send('leave_room', { roomId });
  }
}

export const wsService = new WebSocketService();
