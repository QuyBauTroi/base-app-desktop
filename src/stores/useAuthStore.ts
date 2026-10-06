import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface User {
  username: string;
  email: string;
}

interface AuthState {
  isAuthenticated: boolean;
  token: string | null;
  user: User | null;
  login: (credentials: { username: string; token?: string; email?: string }) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      isAuthenticated: false,
      token: null,
      user: null,

      login: ({ username, token = 'dummy-token', email = 'admin@desktopbase.com' }) => {
        set({
          isAuthenticated: true,
          token,
          user: { username, email },
        });
      },

      logout: () => {
        set({
          isAuthenticated: false,
          token: null,
          user: null,
        });
      },
    }),
    {
      name: 'desktop_base_auth_store', // Persist to localStorage
    }
  )
);
