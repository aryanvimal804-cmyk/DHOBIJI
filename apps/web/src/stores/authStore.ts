import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type Role = 'CUSTOMER' | 'LAUNDRY_PARTNER' | 'DELIVERY_PARTNER' | 'ADMIN';

interface User {
  id: string;
  phoneNumber?: string;
  email?: string;
  role: Role;
  name?: string;
}

interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  login: (user: User, token: string) => void;
  logout: () => void;
  setRole: (role: Role) => void; // Used for mock login
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      token: null,
      isAuthenticated: false,
      login: (user, token) => set({ user, token, isAuthenticated: true }),
      logout: () => set({ user: null, token: null, isAuthenticated: false }),
      setRole: (role) => set({
        user: { id: 'mock-id', phoneNumber: '0000000000', role },
        token: 'mock-token',
        isAuthenticated: true
      })
    }),
    {
      name: 'dhobigo-auth-storage',
    }
  )
);
