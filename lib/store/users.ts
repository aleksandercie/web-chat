import { create } from 'zustand';

export type Iuser = {
  avatar_url: string;
  created_at: string;
  display_name: string;
  id: string;
};

interface UsersState {
  users: Iuser[] | undefined;
  activeUsers: Iuser[] | undefined;
  setActiveUsersByIds: (ids: string[]) => void;
}

export const useUsers = create<UsersState>()((set, get) => ({
  users: undefined,
  activeUsers: undefined,
  setActiveUsersByIds: (ids) => {
    const allUsers = get().users;
    const active = allUsers?.filter((user) => ids.includes(user.id));
    set({ activeUsers: active });
  }
}));
