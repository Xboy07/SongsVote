import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL;

if (!API_URL) {
  console.error('VITE_API_URL is not defined in .env file');
}

const VOTED_SONGS_KEY = 'votedSongs';

export const getVotedSongs = (): string[] => {
  const voted = localStorage.getItem(VOTED_SONGS_KEY);
  return voted ? JSON.parse(voted) : [];
};

export const addVotedSong = (songId: string) => {
  const voted = getVotedSongs();
  localStorage.setItem(VOTED_SONGS_KEY, JSON.stringify([...voted, songId]));
};

export const hasVoted = (songId: string): boolean => {
  const voted = getVotedSongs();
  return voted.includes(songId);
};

export const getSongs = async () => {
  const response = await axios.get(`${API_URL}/songs`);
  return response.data;
};

export const voteSong = async (songId: string): Promise<void> => {
  if (hasVoted(songId)) {
    throw new Error('Already voted for this song');
  }
  await axios.post(`${API_URL}/songs/${songId}/vote`);
  addVotedSong(songId);
};

export const incrementShareCount = async (songId: string): Promise<void> => {
  await axios.post(`${API_URL}/songs/${songId}/share`);
};
