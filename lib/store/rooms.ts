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
  setActiveRoom: (ids: string) => void;
  setRooms: (rooms: Iroom[]) => void;
}

export const useRooms = create<RoomsState>((set) => ({
  rooms: undefined,
  activeRoom: undefined,
  setActiveRoom: (id) => {
    set((state) => ({
      activeRoom: state.rooms?.find((room) => room.id === id)
    }));
  },
  setRooms: (rooms) => {
    set({ rooms });
  }
}));
