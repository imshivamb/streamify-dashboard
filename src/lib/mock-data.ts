import { addDays, subMonths, format } from 'date-fns';

const randomNumber = (min: number, max: number) => Math.floor(Math.random() * (max - min + 1) + min);

const randomDate = () => {
  const end = new Date();
  const start = subMonths(end, 12);
  return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
};

export interface Metrics {
  totalUsers: number;
  activeUsers: number;
  totalStreams: number;
  revenue: number;
  topArtist: string;
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

const artists = [
  'Adele', 'Drake', 'Sia', 'Eminem', 'Rihanna', 'BTS', 'Dua Lipa', 'Arijit Singh',
  'Ed Sheeran', 'Beyoncé', 'Post Malone', 'Lady Gaga', 'The Weeknd', 'Billie Eilish',
  'A.R. Rahman', 'Ariana Grande', 'Shawn Mendes', 'Taylor Swift', 'Justin Bieber'
];

const songs = [
  { title: 'Hello', artist: 'Adele' },
  { title: 'One Dance', artist: 'Drake' },
  { title: 'Cheap Thrills', artist: 'Sia' },
  { title: 'Rap God', artist: 'Eminem' },
  { title: 'Umbrella', artist: 'Rihanna' },
  { title: 'Dynamite', artist: 'BTS' },
  { title: 'Levitating', artist: 'Dua Lipa' },
  { title: 'Tum Hi Ho', artist: 'Arijit Singh' },
  { title: 'Shape of You', artist: 'Ed Sheeran' },
  { title: 'Halo', artist: 'Beyoncé' },
  { title: 'Rockstar', artist: 'Post Malone' },
  { title: 'Bad Romance', artist: 'Lady Gaga' },
  { title: 'Blinding Lights', artist: 'The Weeknd' },
  { title: 'bad guy', artist: 'Billie Eilish' },
  { title: 'Jai Ho', artist: 'A.R. Rahman' },
  { title: '7 rings', artist: 'Ariana Grande' },
  { title: 'Stitches', artist: 'Shawn Mendes' },
  { title: 'Shake It Off', artist: 'Taylor Swift' },
  { title: 'Sorry', artist: 'Justin Bieber' },
  { title: 'Channa Mereya', artist: 'Arijit Singh' }
];

export const generateMetrics = (): Metrics => ({
  totalUsers: randomNumber(900000, 1500000),
  activeUsers: randomNumber(600000, 900000),
  totalStreams: randomNumber(4000000, 8000000),
  revenue: randomNumber(8000000, 15000000),
  topArtist: artists[randomNumber(0, artists.length - 1)],
});

export const generateUserGrowth = (): UserGrowth[] => {
  const data: UserGrowth[] = [];
  let totalUsers = randomNumber(800000, 1000000);
  let activeUsers = randomNumber(500000, 700000);

  for (let i = 0; i < 12; i++) {
    const date = subMonths(new Date(), 11 - i);
    totalUsers += randomNumber(10000, 50000);
    activeUsers += randomNumber(5000, 30000);

    data.push({
      date: format(date, 'yyyy-MM-dd'),
      totalUsers,
      activeUsers,
    });
  }

  return data;
};

export const generateRevenueDistribution = (): RevenueDistribution[] => [
  { source: 'Subscriptions', amount: randomNumber(5000000, 10000000) },
  { source: 'Ads', amount: randomNumber(1000000, 3000000) },
  { source: 'Merchandise', amount: randomNumber(500000, 1500000) },
];

export const generateTopStreamedSongs = (): TopStreamedSong[] => {
  const shuffled = [...songs].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, 5).map(song => ({
    title: song.title,
    artist: song.artist,
    streams: randomNumber(100000, 1000000)
  }));
};

export const generateRecentStreams = (count: number): RecentStream[] => {
  const streams: RecentStream[] = [];

  for (let i = 0; i < count; i++) {
    const song = songs[randomNumber(0, songs.length - 1)];
    streams.push({
      songName: song.title,
      artist: song.artist,
      dateStreamed: format(randomDate(), 'yyyy-MM-dd HH:mm:ss'),
      streamCount: randomNumber(1, 1000),
      userId: `user_${randomNumber(10000, 99999)}`,
    });
  }

  return streams;
};