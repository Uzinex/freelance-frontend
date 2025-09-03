import { create } from 'zustand';

export interface ChatMessage {
  id: number;
  room: { id: number };
  author: { id: number; username: string };
  content: string;
  createdAt: string;
}

interface ChatState {
  activeRoomId: number | null;
  messages: ChatMessage[];
  setActiveRoom: (id: number | null) => void;
  setMessages: (msgs: ChatMessage[]) => void;
  addMessage: (msg: ChatMessage) => void;
}

export const useChatStore = create<ChatState>((set) => ({
  activeRoomId: null,
  messages: [],
  setActiveRoom: (id) => set({ activeRoomId: id, messages: [] }),
  setMessages: (msgs) => set({ messages: msgs }),
  addMessage: (msg) =>
    set((state) => ({ messages: [...state.messages, msg] })),
}));
