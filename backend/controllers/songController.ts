import { Request, Response } from 'express';
import Song from '../models/Song';

export const getSongs = async (req: Request, res: Response) => {
  try {
    const songs = await Song.find().sort({ votes: -1 }); // Sort by votes in descending order
    res.json(songs);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching songs', error });
  }
};

export const getSongById = async (req: Request, res: Response) => {
  try {
    const song = await Song.findOne({ id: req.params.id });
    if (!song) {
      return res.status(404).json({ message: 'Song not found' });
    }
    res.json(song);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching song', error });
  }
};

export const voteSong = async (req: Request, res: Response) => {
  try {
    const song = await Song.findOne({ id: req.params.id });
    if (!song) {
      return res.status(404).json({ message: 'Song not found' });
    }
    
    // Increment votes and save
    song.votes += 1;
    await song.save();
    
    res.json(song);
  } catch (error) {
    console.error('Vote error:', error);
    res.status(500).json({ message: 'Error voting for song', error });
  }
};

export const shareSong = async (req: Request, res: Response) => {
  try {
    const song = await Song.findOne({ id: req.params.id });
    if (!song) {
      return res.status(404).json({ message: 'Song not found' });
    }
    
    // Increment share count and save
    song.shareCount += 1;
    await song.save();
    
    res.json(song);
  } catch (error) {
    console.error('Share error:', error);
    res.status(500).json({ message: 'Error sharing song', error });
  }
};
