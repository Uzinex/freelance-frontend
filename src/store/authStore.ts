import { create } from 'zustand';

interface Tokens {
  accessToken: string;
  refreshToken: string;
  role?: string;
}

interface AuthState {
  accessToken: string | null;
  refreshToken: string | null;
  role: string | null;
  login: (tokens: Tokens) => void;
  logout: () => void;
}

const storedAccess = typeof window !== 'undefined' ? localStorage.getItem('accessToken') : null;
const storedRefresh = typeof window !== 'undefined' ? localStorage.getItem('refreshToken') : null;
const storedRole = typeof window !== 'undefined' ? localStorage.getItem('role') : null;

export const useAuthStore = create<AuthState>((set) => ({
  accessToken: storedAccess,
  refreshToken: storedRefresh,
  role: storedRole,
  login: ({ accessToken, refreshToken, role }) => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('accessToken', accessToken);
      localStorage.setItem('refreshToken', refreshToken);
      if (role) {
        localStorage.setItem('role', role);
      }
    }
    set({ accessToken, refreshToken, role: role ?? null });
  },
  logout: () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
      localStorage.removeItem('role');
    }
    set({ accessToken: null, refreshToken: null, role: null });
  },
}));
