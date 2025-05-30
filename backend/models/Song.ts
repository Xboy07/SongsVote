import mongoose, { Schema, Document } from 'mongoose';

export interface ISong extends Document {
  id: string;
  title: string;
  artist: string;
  embedUrl: string;
  votes: number;
  shareCount: number;
}

const SongSchema: Schema = new Schema({
  id: { type: String, required: true, unique: true },
  title: { type: String, required: true },
  artist: { type: String, required: true },
  embedUrl: { type: String, required: true },
  votes: { type: Number, default: 0 },
  shareCount: { type: Number, default: 0 }
});

export default mongoose.model<ISong>('Song', SongSchema);
