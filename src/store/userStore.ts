import { create } from 'zustand';
import { supabase } from '../lib/supabase';
export interface AppUser {
  id: string;
  name: string;
  role: string;
  username: string;
  password: string;
  department?: string;
  active: boolean;
}

interface UserStore {
  users: AppUser[];
setUsers: (
  users: AppUser[]
) => void;

loadUsers: () => Promise<void>;
  addUser: (
    user: AppUser
  ) => void;

  updateUser: (
    userId: string,
    updates: Partial<AppUser>
  ) => void;
}

export const useUserStore =
  create<UserStore>((set) => ({
    users: [
      {
        id: 'SU001',
        name: 'Super User',
        role: 'Super User',
        username: 'superuser',
        password: 'admin123',
        active: true,
      },
      {
        id: 'AD001',
        name: 'Admin User',
        role: 'Admin',
        username: 'admin',
        password: 'admin123',
        active: true,
      },
      {
        id: 'DR001',
        name: 'Dr Udumula Ashok Reddy',
        role: 'Doctor',
        username: 'ashok',
        password: 'doctor123',
        department: 'Orthopaedics',
        active: true,
      },
      {
        id: 'DR002',
        name: 'Dr S.V. Geethika Reddy',
        role: 'Doctor',
        username: 'geethika',
        password: 'doctor123',
        department: 'Gynaecology',
        active: true,
      },

      {
        id: 'EX001',
        name: 'Executive User 1',
        role: 'Executive',
        username: 'executive1',
        password: 'admin123',
        active: true,
      },
      {
        id: 'EX002',
        name: 'Executive User 2',
        role: 'Executive',
        username: 'executive2',
        password: 'admin123',
        active: true,
      },
      {
        id: 'EX003',
        name: 'Executive User 3',
        role: 'Executive',
        username: 'executive3',
        password: 'admin123',
        active: true,
      },
      {
        id: 'EX004',
        name: 'Executive User 4',
        role: 'Executive',
        username: 'executive4',
        password: 'admin123',
        active: true,
      },
      {
        id: 'EX005',
        name: 'Executive User 5',
        role: 'Executive',
        username: 'executive5',
        password: 'admin123',
        active: true,
      },
    ],
setUsers: (users) =>
  set({
    users,
  }),

loadUsers: async () => {
  const { data, error } =
    await supabase
      .from('users')
      .select('*');

console.log('SUPABASE DATA', data);
console.log('SUPABASE ERROR', error);

if (error) {
  return;
}

  set({
    users:
      data as AppUser[],
  });
},
    addUser: (user) =>
      set((state) => ({
        users: [
          ...state.users,
          user,
        ],
      })),

    updateUser: (
      userId,
      updates
    ) =>
      set((state) => ({
        users: state.users.map(
          (user) =>
            user.id === userId
              ? {
                  ...user,
                  ...updates,
                }
              : user
        ),
      })),
  }));