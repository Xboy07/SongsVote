import React, { useState, Fragment } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { 
  FacebookShareButton, 
  TwitterShareButton, 
  WhatsappShareButton,
  FacebookIcon,
  TwitterIcon,
  WhatsappIcon
} from 'react-share';
import { Copy, X } from 'lucide-react';
import Button from './ui/Button';
import toast from 'react-hot-toast';
import { incrementShareCount } from '../services/songService';
import { Song } from '../types';

interface ShareModalProps {
  isOpen: boolean;
  closeModal: () => void;
  song: Song;
}

const ShareModal: React.FC<ShareModalProps> = ({ isOpen, closeModal, song }) => {
  const [isCopied, setIsCopied] = useState(false);
  
  const shareUrl = `${window.location.origin}/song/${song.id}`;
  const shareTitle = `Vote for "${song.title}" by ${song.artist} on Harmonic Vote!`;
  
  const handleCopyLink = () => {
    navigator.clipboard.writeText(shareUrl);
    setIsCopied(true);
    toast.success('Link copied to clipboard!');
    
    setTimeout(() => {
      setIsCopied(false);
    }, 3000);
  };
  
  const handleShare = async (platform: string) => {
    try {
      await incrementShareCount(song.id);
      toast.success(`Shared on ${platform}!`);
    } catch (error) {
      console.error('Error incrementing share count:', error);
      toast.error('Failed to track share');
    }
  };

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={closeModal}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/30 backdrop-blur-sm" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 shadow-xl transition-all">
                <div className="absolute right-4 top-4">
                  <button
                    type="button"
                    className="text-gray-400 hover:text-gray-500"
                    onClick={closeModal}
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>
                
                <Dialog.Title
                  as="h3"
                  className="text-lg font-medium leading-6 text-lofi-dark mb-4"
                >
                  Share "{song.title}"
                </Dialog.Title>
                
                <div className="flex flex-col gap-4">
                  <div className="flex items-center space-x-2 p-2 bg-lofi-cream/30 rounded-md">
                    <input
                      type="text"
                      value={shareUrl}
                      readOnly
                      className="flex-1 p-2 bg-transparent text-sm border-none focus:outline-none text-lofi-dark"
                    />
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={handleCopyLink}
                      className="flex items-center"
                    >
                      <Copy className="h-4 w-4 mr-1" />
                      {isCopied ? 'Copied!' : 'Copy'}
                    </Button>
                  </div>
                  
                  <div className="flex justify-center space-x-4 mt-2">
                    <FacebookShareButton 
                      url={shareUrl} 
                      quote={shareTitle}
                      onClick={() => handleShare('Facebook')}
                    >
                      <FacebookIcon size={40} round />
                    </FacebookShareButton>
                    
                    <TwitterShareButton 
                      url={shareUrl} 
                      title={shareTitle}
                      onClick={() => handleShare('Twitter')}
                    >
                      <TwitterIcon size={40} round />
                    </TwitterShareButton>
                    
                    <WhatsappShareButton 
                      url={shareUrl} 
                      title={shareTitle}
                      onClick={() => handleShare('WhatsApp')}
                    >
                      <WhatsappIcon size={40} round />
                    </WhatsappShareButton>
                  </div>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default ShareModal;