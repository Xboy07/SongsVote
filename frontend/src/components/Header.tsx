import React, { useEffect, useRef } from 'react';
import { Music } from 'lucide-react';
import { gsap } from 'gsap';
import { Link } from 'react-router-dom';

const Header: React.FC = () => {
  const headerRef = useRef<HTMLDivElement>(null);
  const logoContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.fromTo(
      headerRef.current,
      { y: -100, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, ease: 'power3.out' }
    );

    gsap.fromTo(
      logoContainerRef.current,
      { scale: 0.8, opacity: 0 },
      { 
        scale: 1, 
        opacity: 1, 
        duration: 1.2, 
        delay: 0.3,
        ease: 'elastic.out(1, 0.3)' 
      }
    );
  }, []);

  return (
    <header 
      ref={headerRef} 
      className="fixed top-0 left-0 right-0 z-10 backdrop-blur-md bg-white/20 border-b border-white/10"
    >
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <div ref={logoContainerRef}>
          <Link to="/" className="flex items-center">
            <Music className="h-6 w-6 text-lofi-accent mr-2" />
            <h1 className="text-xl font-semibold text-lofi-dark">Vote2Stream</h1>
          </Link>
        </div>

        <div className="flex items-center gap-4">
          {/* Spotify Icon */}
          <a 
            href="https://open.spotify.com/artist/5WHZ7ZLFTcVzF1hJZgJzgp?si=i1fyCIzuSTaRDVf_954ZIA" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-lofi-dark hover:text-lofi-accent transition-colors"
            title="Spotify"
          >
            <svg viewBox="0 0 24 24" className="h-5 w-5 fill-current">
              <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.371-.721.49-1.09.24-3.001-1.819-6.762-2.234-11.162-1.23-.42.09-.84-.181-.93-.601-.09-.42.18-.84.601-.93 4.86-1.11 9.051-.6 12.451 1.421.36.3.42.779.13 1.1zm1.47-3.27c-.301.42-.841.6-1.262.3-3.421-2.101-8.641-2.701-12.722-1.481-.479.121-1.02-.12-1.14-.621-.121-.48.12-1.021.621-1.141 4.641-1.41 10.441-.721 14.401 1.68.42.3.601.84.301 1.261zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z"/>
            </svg>
          </a>
          {/* Apple Music Icon */}
          <a 
            href="https://music.apple.com/in/artist/x-boy/1800881639" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-lofi-dark hover:text-lofi-accent transition-colors"
            title="Apple Music"
          >
            <svg viewBox="0 0 24 24" className="h-5 w-5 fill-current">
              <path d="M23.994 6.124a9.23 9.23 0 00-.24-2.19c-.317-1.31-1.062-2.31-2.18-3.043a5.022 5.022 0 00-1.877-.726 10.496 10.496 0 00-1.564-.15c-.04-.003-.083-.01-.124-.013H5.986c-.152.01-.303.017-.455.026-.747.043-1.49.123-2.193.4-1.336.53-2.3 1.452-2.865 2.78-.192.448-.292.925-.363 1.408-.056.392-.088.785-.1 1.18 0 .032-.007.062-.01.093v12.223c.01.14.017.283.027.424.05.815.154 1.624.497 2.373.65 1.42 1.738 2.353 3.234 2.802.42.127.856.187 1.293.228.555.053 1.11.06 1.667.06h11.03a12.5 12.5 0 001.57-.1c.822-.106 1.596-.35 2.295-.81a5.046 5.046 0 001.88-2.207c.186-.42.293-.87.37-1.324.113-.675.138-1.358.137-2.04-.002-3.8 0-7.595-.003-11.393zm-6.423 3.99v5.712c0 .417-.058.827-.244 1.206-.29.59-.76.962-1.388 1.14-.35.1-.706.157-1.07.173-.95.045-1.773-.6-1.943-1.536a1.88 1.88 0 011.038-2.022c.323-.16.67-.25 1.018-.324.378-.082.758-.153 1.134-.24.274-.063.457-.23.51-.516a.904.904 0 00.02-.193c0-1.815 0-3.63-.002-5.443a.725.725 0 00-.026-.185c-.04-.15-.15-.243-.304-.234-.16.01-.318.035-.475.066-.76.15-1.52.303-2.28.456l-2.325.47-1.374.278c-.016.003-.032.01-.048.013-.277.077-.377.203-.39.49-.002.042 0 .086 0 .13-.002 2.602 0 5.204-.003 7.805 0 .42-.047.836-.215 1.227-.278.64-.77 1.04-1.434 1.233-.35.1-.71.16-1.075.172-.96.036-1.755-.6-1.92-1.544-.14-.812.23-1.685 1.154-2.075.357-.15.73-.232 1.108-.31.287-.06.575-.116.86-.177.383-.083.583-.323.6-.714v-.15c0-2.96 0-5.922.002-8.882 0-.123.013-.25.042-.37.07-.285.273-.448.546-.518.255-.066.515-.112.774-.165.733-.15 1.466-.296 2.2-.444l2.27-.46c.67-.134 1.34-.27 2.01-.403.22-.043.442-.088.663-.106.31-.025.523.17.554.482.008.073.012.148.012.223.002 1.91.002 3.822 0 5.732z"/>
            </svg>
          </a>
          {/* YouTube Music Icon */}
          <a 
            href="https://www.youtube.com/@xboybx" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-lofi-dark hover:text-lofi-accent transition-colors"
            title="YouTube Music"
          >
            <svg viewBox="0 0 24 24" className="h-5 w-5 fill-current">
              <path d="M12 0C5.376 0 0 5.376 0 12s5.376 12 12 12 12-5.376 12-12S18.624 0 12 0zm0 19.104c-3.936 0-7.104-3.168-7.104-7.104S8.064 4.896 12 4.896s7.104 3.168 7.104 7.104-3.168 7.104-7.104 7.104zm0-13.332c-3.432 0-6.228 2.796-6.228 6.228S8.568 18.228 12 18.228s6.228-2.796 6.228-6.228S15.432 5.772 12 5.772zM9.768 15.72V8.28l6.432 3.72-6.432 3.72z"/>
            </svg>
          </a>
        </div>
      </div>
    </header>
  );
}

export default Header;