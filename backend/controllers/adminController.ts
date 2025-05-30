import { Request, Response } from 'express';
import Song from '../models/Song';

export const createSong = async (req: Request, res: Response) => {
  try {
    const { id, title, artist, embedUrl } = req.body;
    const existingSong = await Song.findOne({ id });
    if (existingSong) {
      return res.status(400).json({ message: 'Song with this ID already exists' });
    }
    const newSong = new Song({
      id,
      title,
      artist,
      embedUrl,
      votes: 0,
      shareCount: 0
    });
    await newSong.save();
    res.status(201).json(newSong);
  } catch (error) {
    res.status(500).json({ message: 'Error creating song', error });
  }
};

export const updateSong = async (req: Request, res: Response) => {
  try {
    const song = await Song.findOneAndUpdate({ id: req.params.id }, req.body, { new: true });
    if (!song) {
      return res.status(404).json({ message: 'Song not found' });
    }
    res.json(song);
  } catch (error) {
    res.status(500).json({ message: 'Error updating song', error });
  }
};

export const deleteSong = async (req: Request, res: Response) => {
  try {
    const song = await Song.findOneAndDelete({ id: req.params.id });
    if (!song) {
      return res.status(404).json({ message: 'Song not found' });
    }
    res.json({ message: 'Song deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting song', error });
  }
};
