export interface User {
    id?: string,
    name: string,
    email: string,
    password: string

}

export interface Metrics {
    totalUsers: number,
    activeUsers: number,
    totalStreams: number,
    revenue: number,
    topArtist: string
}

export interface UserGrowth {
    date: string;
    totalUsers: number;
    activeUsers: number;
  }

  export interface RevenueDistribution {
    source: string;
    amount: number;
  }
  
  export interface TopStreamedSong {
    title: string;
    artist: string;
    streams: number;
  }
  
  export interface RecentStream {
    songName: string;
    artist: string;
    dateStreamed: string;
    streamCount: number;
    userId: string;
  }

  export interface Stream {
    songName: string;
    artist: string;
    dateStreamed: string;
    streamCount: number;
    userId: string;
  }