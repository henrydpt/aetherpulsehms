import { create } from 'zustand';

interface AuthStore {
  role: string;
  setRole: (role: string) => void;
}

export const useAuthStore =
  create<AuthStore>((set) => ({
    role: 'Executive',

    setRole: (role) =>
      set({
        role,
      }),
  }));