import { create } from 'zustand';

export type Imessage = {
  created_at: string;
  id: string;
  send_by: string;
  text: string;
  room_id: string;
  users: {
    avatar_url: string;
    created_at: string;
    display_name: string;
    id: string;
  } | null;
};

interface MessageState {
  messages: Imessage[] | undefined;
  optimisticIds: string[];
  isLoadingMessages: boolean;
  setOptimisticIds: (id: string) => void;
  updateMessages: (messages: Imessage | Imessage[]) => void;
  setLoadingMessages: (isLoading: boolean) => void;
}

export const useMessage = create<MessageState>((set) => ({
  messages: undefined,
  optimisticIds: [],
  isLoadingMessages: false,
  setOptimisticIds: (id) =>
    set((state) => ({
      optimisticIds: [...state.optimisticIds, id]
    })),
  updateMessages: (newMessages) =>
    set((state) => {
      if (Array.isArray(newMessages)) {
        return { messages: newMessages };
      } else {
        const updatedMessages = state.messages
          ? [...state.messages, newMessages]
          : [newMessages];
        return { messages: updatedMessages };
      }
    }),
  setLoadingMessages: (isLoading) =>
    set(() => ({ isLoadingMessages: isLoading }))
}));
