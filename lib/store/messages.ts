import { create } from 'zustand';

export type Imessage = {
  created_at: string;
  id: string;
  send_by: string;
  text: string;
  users: {
    avatar_url: string;
    created_at: string;
    display_name: string;
    id: string;
  } | null;
} | null;

interface MessageState {
  messages: Imessage[];
  addMessage: (message: Imessage) => void;
}

export const useMessage = create<MessageState>()((set) => ({
  messages: [],
  addMessage: (newMessages) =>
    set((state) => ({
      messages: [...state.messages, newMessages]
    }))
}));
