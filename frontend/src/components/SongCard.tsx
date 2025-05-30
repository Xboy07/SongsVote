import React, { useState, useRef } from 'react';
import { Share2, ThumbsUp } from 'lucide-react';
import GlassCard from './ui/GlassCard';
import Button from './ui/Button';
import ShareModal from './ShareModal';
import { voteSong, hasVoted } from '../services/songService';
import toast from 'react-hot-toast';
import { Song } from '../types';
import { useSongCardAnimation, useVoteAnimation } from '../hooks/useGSAP';

interface SongCardProps {
  song: Song;
  onVote: (songId: string) => void;
}

const modifyEmbedUrl = (url: string) => {
  // Parse the URL and add parameters to hide unwanted elements
  try {
    const urlObj = new URL(url);
    urlObj.searchParams.set('hide_related', 'true');
    urlObj.searchParams.set('show_teaser', 'false');
    urlObj.searchParams.set('show_user', 'false');
    urlObj.searchParams.set('show_reposts', 'false');
    return urlObj.toString();
  } catch {
    return url;
  }
};

const SongCard: React.FC<SongCardProps> = ({ song, onVote }) => {
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const [isVoting, setIsVoting] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  const voteButtonRef = useRef<HTMLDivElement>(null);
  const voteCountRef = useRef<HTMLDivElement>(null);
  
  useSongCardAnimation(cardRef);
  const animateVote = useVoteAnimation(voteButtonRef);
  
  const hasUserVoted = hasVoted(song.id);
  
  const handleVote = async () => {
    if (hasUserVoted) {
      toast.error('You have already voted for this song');
      return;
    }
    
    try {
      setIsVoting(true);
      await voteSong(song.id);
      animateVote();
      onVote(song.id);
      toast.success('Vote counted!');
    } catch (error) {
      console.error('Error voting:', error);
      toast.error('Failed to vote');
    } finally {
      setIsVoting(false);
    }
  };

  return (
    <>
      <GlassCard 
        ref={cardRef} 
        className="w-full transform hover:scale-[1.01] transition-all duration-300 backdrop-blur-lg bg-white/10 border border-white/20 shadow-xl"
      >
        <div className="flex flex-col gap-4">
          {/* Player section */}
          <div className="w-full">
            <div className="text-sm text-lofi-brown/80 mb-2 text-center font-medium">
              Click the play button below to listen to the track
            </div>
            <div className="rounded-lg overflow-hidden backdrop-blur-md bg-white/5 border border-white/10">
              <iframe
                width="100%"
                height="140"
                scrolling="no"
                frameBorder="no"
                allow="autoplay"
                src={modifyEmbedUrl(song.embedUrl)}
                className="w-full"
              ></iframe>
            </div>
          </div>
          
          {/* Content section */}
          <div className="w-full flex flex-col sm:flex-row justify-between items-center gap-4">
            <div className="flex-1 min-w-0">
              <h3 className="text-lg font-semibold text-lofi-dark/90 truncate">
                {song.title}
              </h3>
              <p className="text-sm text-lofi-brown/80 truncate">
                {song.artist}
              </p>
            </div>
            
            <div 
              ref={voteCountRef} 
              className="flex items-center gap-3"
            >
              <span className="bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-medium text-lofi-dark/90 whitespace-nowrap border border-white/10">
                {song.votes} votes
              </span>
              <span className="bg-white/10 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-medium text-lofi-dark/80 whitespace-nowrap border border-white/10">
                {song.shareCount} shares
              </span>
            </div>
          </div>
          
          {/* Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 sm:justify-end">
            <div ref={voteButtonRef} className="w-full sm:w-auto">
              <Button
                variant={hasUserVoted ? 'secondary' : 'primary'}
                size="md"
                onClick={handleVote}
                disabled={isVoting || hasUserVoted}
                isLoading={isVoting}
                className="flex items-center justify-center gap-2 w-full sm:w-[120px] lg:w-[100px] backdrop-blur-sm"
              >
                <ThumbsUp className="h-4 w-4" />
                <span>{hasUserVoted ? 'Voted' : 'Vote'}</span>
              </Button>
            </div>
            
            <div className="w-full sm:w-auto">
              <Button
                variant="outline"
                size="md"
                onClick={() => setIsShareModalOpen(true)}
                className="flex items-center justify-center gap-2 w-full sm:w-[120px] lg:w-[100px] backdrop-blur-sm"
              >
                <Share2 className="h-4 w-4" />
                <span>Share</span>
              </Button>
            </div>
          </div>
        </div>
      </GlassCard>
      
      <ShareModal
        isOpen={isShareModalOpen}
        closeModal={() => setIsShareModalOpen(false)}
        song={song}
      />
    </>
  );
};

export default SongCard;