import { create } from 'zustand';

interface AuthStore {
  role: string;
  userName: string;

  setRole: (
    role: string
  ) => void;

  setUserName: (
    userName: string
  ) => void;
}

export const useAuthStore =
  create<AuthStore>((set) => ({
    role: 'Executive',

    userName:
      'Executive User',

    setRole: (role) =>
      set({
        role,
      }),

    setUserName: (
      userName
    ) =>
      set({
        userName,
      }),
  }));