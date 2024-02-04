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
};

interface MessageState {
  messages: Imessage[];
  optimisticIds: string[];
  addMessage: (message: Imessage) => void;
  setOptimisticIds: (id: string) => void;
}

export const useMessage = create<MessageState>()((set) => ({
  messages: [],
  optimisticIds: [],
  addMessage: (newMessages) =>
    set((state) => ({
      messages: [...state.messages, newMessages]
    })),
  setOptimisticIds: (id: string) =>
    set((state) => ({ optimisticIds: [...state.optimisticIds, id] }))
}));
