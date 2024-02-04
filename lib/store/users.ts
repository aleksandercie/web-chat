import { create } from 'zustand';

export type Iuser = {
  avatar_url: string;
  created_at: string;
  display_name: string;
  id: string;
};

interface UsersState {
  users: Iuser[] | undefined;
}

export const useUsers = create<UsersState>()(() => ({
  users: undefined
}));
