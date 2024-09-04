import { Metrics, UserGrowth, RevenueDistribution, TopStreamedSong, RecentStream } from '@/types'

export async function fetchMetrics(): Promise<Metrics> {
  const response = await fetch('/api/metrics')
  if (!response.ok) {
    throw new Error('Failed to fetch metrics')
  }
  return response.json()
}

export async function fetchUserGrowth(): Promise<UserGrowth[]> {
  const response = await fetch('/api/user-growth')
  if (!response.ok) {
    throw new Error('Failed to fetch user growth data')
  }
  return response.json()
}

export async function fetchRevenueDistribution(): Promise<RevenueDistribution[]> {
  const response = await fetch('/api/revenue')
  if (!response.ok) {
    throw new Error('Failed to fetch revenue distribution data')
  }
  return response.json()
}

export async function fetchTopStreamedSongs(): Promise<TopStreamedSong[]> {
  const response = await fetch('/api/top-songs')
  if (!response.ok) {
    throw new Error('Failed to fetch top streamed songs')
  }
  return response.json()
}

export async function fetchRecentStreams(): Promise<RecentStream[]> {
  const response = await fetch('/api/recent-streams')
  if (!response.ok) {
    throw new Error('Failed to fetch recent streams')
  }
  return response.json()
}