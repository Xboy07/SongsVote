import React, { useState, useEffect } from 'react';
import SongCard from './SongCard';
import { getSongs } from '../services/songService';
import { Song } from '../types';

const SongList: React.FC = () => {
  const [songs, setSongs] = useState<Song[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchSongs = async () => {
    try {
      const songsData = await getSongs();
      if (Array.isArray(songsData)) {
        setSongs(songsData);
      } else {
        setSongs([]);
        console.error('Expected songs array but got:', songsData);
      }
    } catch (error) {
      console.error('Error fetching songs:', error);
      setSongs([]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchSongs();
  }, []);

  const handleVote = (songId: string) => {
    setSongs(prevSongs =>
      prevSongs.map(song =>
        song.id === songId ? { ...song, votes: song.votes + 1 } : song
      )
    );
    // Refetch songs to ensure we have the latest data from the server
    fetchSongs();
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <div className="animate-pulse">Loading songs...</div>
      </div>
    );
  }

  if (songs.length === 0) {
    return (
      <div className="text-center text-lofi-dark/70">
        No songs available yet
      </div>
    );
  }

  return (
    <div className="w-full px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="flex flex-col gap-6">
        {songs.map((song) => (
          <SongCard 
            key={song.id} 
            song={song} 
            onVote={() => handleVote(song.id)}
          />
        ))}
      </div>
    </div>
  );
};

export default SongList;
