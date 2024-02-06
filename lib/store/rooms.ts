import { create } from 'zustand';

export type Iroom = {
  created_at: string;
  id: string;
  user1_id: string;
  user2_id: string;
};

interface RoomsState {
  rooms: Iroom[] | undefined;
  activeRoom: Iroom | undefined;
  setActiveRoom: (newRoom: Iroom) => void;
  setRooms: (rooms: Iroom[]) => void;
}

export const useRooms = create<RoomsState>((set, get) => ({
  rooms: undefined,
  activeRoom: undefined,
  setActiveRoom: (newRoom) => {
    set((state) => ({
      ...state,
      activeRoom: newRoom
    }));
  },
  setRooms: (rooms) => {
    set({ rooms });
  }
}));
