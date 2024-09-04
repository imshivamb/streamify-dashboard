import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import { User, Metrics, UserGrowth, RevenueDistribution, TopStreamedSong, RecentStream } from '@/types'

interface AuthStore {
  user: User | null;
  isAuthenticated: boolean;
  setUser: (user: User | null) => void;
  setIsAuthenticated: (isAuthenticated: boolean) => void;  // Add this line
  logout: () => void;
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

export const useStore = create<Store>()(
  persist(
    (set) => ({
      // Auth state
      user: null,
      isAuthenticated: false,
      setUser: (user) => set({ user, isAuthenticated: !!user }),
      setIsAuthenticated: (isAuthenticated) => set({ isAuthenticated }),  // Add this line
      logout: () => set({ user: null, isAuthenticated: false }),

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
      partialize: (state) => ({ user: state.user, isAuthenticated: state.isAuthenticated }),
    }
  )
)