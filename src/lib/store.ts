import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import { User, Metrics, UserGrowth, RevenueDistribution, TopStreamedSong, RecentStream } from '@/types'

interface AuthStore {
  user: User | null;
  users: User[]; 
  isAuthenticated: boolean;
  setUser: (user: User | null) => void;
  setIsAuthenticated: (isAuthenticated: boolean) => void;
  logout: () => void;
  register: (email: string, password: string, name: string) => Promise<{ success: boolean; message: string }>;
  login: (email: string, password: string) => Promise<{ success: boolean; message: string }>;
}

interface DashboardStore {
  metrics: Metrics | null;
  userGrowth: UserGrowth[];
  revenueDistribution: RevenueDistribution[];
  topStreamedSongs: TopStreamedSong[];
  recentStreams: RecentStream[];
  setMetrics: (metrics: Metrics) => void;
  setUserGrowth: (userGrowth: UserGrowth[]) => void;
  setRevenueDistribution: (revenueDistribution: RevenueDistribution[]) => void;
  setTopStreamedSongs: (topStreamedSongs: TopStreamedSong[]) => void;
  setRecentStreams: (recentStreams: RecentStream[]) => void;
}

type Store = AuthStore & DashboardStore;

const initialTestUser: User = {
  id: '1',
  email: 'user@example.com',
  password: 'password',
  name: 'Test User'
};

export const useStore = create<Store>()(
  persist(
    (set, get) => ({
      // Auth state
      user: null,
      users: [initialTestUser], 
      isAuthenticated: false,
      setUser: (user) => set({ user, isAuthenticated: !!user }),
      setIsAuthenticated: (isAuthenticated) => set({ isAuthenticated }),
      logout: () => set({ user: null, isAuthenticated: false }),
      register: async (email, password, name) => {
        const users = get().users;
        if (users.some(u => u.email === email)) {
          return { success: false, message: 'User already exists' };
        }
        const newUser = { id: String(users.length + 1), email, password, name };
        set(state => ({ users: [...state.users, newUser] }));
        set({ user: newUser, isAuthenticated: true });
        return { success: true, message: 'User registered successfully' };
      },
      login: async (email, password) => {
        const user = get().users.find(u => u.email === email && u.password === password);
        if (user) {
          set({ user, isAuthenticated: true });
          return { success: true, message: 'Login successful' };
        }
        return { success: false, message: 'Invalid credentials' };
      },

      // Dashboard state
      metrics: null,
      userGrowth: [],
      revenueDistribution: [],
      topStreamedSongs: [],
      recentStreams: [],
      setMetrics: (metrics) => set({ metrics }),
      setUserGrowth: (userGrowth) => set({ userGrowth }),
      setRevenueDistribution: (revenueDistribution) => set({ revenueDistribution }),
      setTopStreamedSongs: (topStreamedSongs) => set({ topStreamedSongs }),
      setRecentStreams: (recentStreams) => set({ recentStreams }),
    }),
    {
      name: 'streamify-storage',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({ 
        user: state.user, 
        users: state.users,  // Include users in persisted state
        isAuthenticated: state.isAuthenticated 
      }),
    }
  )
)