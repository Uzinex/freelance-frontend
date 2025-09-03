import { useChatStore } from '../store/chatStore';

class ChatWSClient {
  private socket: WebSocket | null = null;

  connect(roomId: number) {
    this.socket = new WebSocket(`ws://localhost:8000/ws/chat/${roomId}/`);
    this.socket.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        useChatStore.getState().addMessage(data);
      } catch {
        // ignore parse errors
      }
    };
  }

  disconnect() {
    this.socket?.close();
    this.socket = null;
  }

  sendMessage(content: string) {
    this.socket?.send(JSON.stringify({ content }));
  }
}

export const wsClient = new ChatWSClient();
