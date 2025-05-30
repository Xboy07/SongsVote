import React, { useState } from 'react';
import GlassCard from './ui/GlassCard';
import Button from './ui/Button';
import toast from 'react-hot-toast';
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL;

if (!API_URL) {
  console.error('VITE_API_URL is not defined in .env file');
}

const extractSongInfo = (embedCode: string) => {
  try {
    // Extract the iframe src URL
    const srcMatch = embedCode.match(/src="([^"]+)"/);
    if (!srcMatch) throw new Error('Invalid embed code: No src found');
    
    // Extract title and artist from the div section
    const artistMatch = embedCode.match(/title="([^"]+)" target="_blank"/);
    const titleMatch = embedCode.match(/title="([^"]+)" target="_blank".*?<\/a> · <a.*?title="([^"]+)"/);
    
    return {
      embedUrl: srcMatch[1],
      artist: artistMatch ? artistMatch[1] : 'Unknown Artist',
      title: titleMatch ? titleMatch[2] : 'Unknown Title'
    };
  } catch (error) {
    throw new Error('Invalid embed code format');
  }
};

const AdminDashboard: React.FC = () => {
  const [embedCode, setEmbedCode] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      const songInfo = extractSongInfo(embedCode);
      
      // Generate a unique ID
      const id = `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
      
      const newSong = {
        id,
        title: songInfo.title,
        artist: songInfo.artist,
        embedUrl: songInfo.embedUrl,
        votes: 0,
        shareCount: 0
      };

      const response = await axios.post(`${API_URL}/admin/songs`, newSong);
      
      if (response.data) {
        toast.success(`Song "${songInfo.title}" by ${songInfo.artist} uploaded successfully!`);
        setEmbedCode('');
      } else {
        throw new Error('No response data received');
      }
    } catch (error: any) {
      console.error('Upload error:', error);
      
      const errorMessage = error.message === 'Invalid embed code format' 
        ? 'Please provide a valid SoundCloud embed code'
        : error.response?.data?.message || 'Error uploading song. Please check your server connection.';
      
      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <GlassCard className="max-w-xl mx-auto">
      <h2 className="text-2xl font-semibold text-lofi-dark mb-6">Upload New Song</h2>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="embedCode" className="block text-sm font-medium text-lofi-dark mb-2">
            SoundCloud Embed Code
          </label>
          <textarea
            id="embedCode"
            value={embedCode}
            onChange={e => setEmbedCode(e.target.value)}
            required
            className="w-full px-4 py-2 rounded-md bg-white/50 border border-lofi-beige focus:outline-none focus:ring-2 focus:ring-lofi-accent h-40"
            placeholder="Paste the full SoundCloud embed code here..."
          />
          <p className="mt-2 text-sm text-lofi-brown">
            Get this from SoundCloud by clicking Share {'->'} Embed {'->'} Copy Embed Code
          </p>
        </div>
        
        <Button
          type="submit"
          variant="primary"
          size="lg"
          fullWidth
          isLoading={isLoading}
        >
          Upload Song
        </Button>
      </form>
    </GlassCard>
  );
};

export default AdminDashboard;
