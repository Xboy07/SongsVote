import React, { useRef } from 'react';
import { useGSAP } from '../hooks/useGSAP';
import { HeadphonesIcon } from 'lucide-react';

const Hero: React.FC = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const iconRef = useRef<HTMLDivElement>(null);
  const scrollIconRef = useRef<HTMLDivElement>(null);

  useGSAP({
    animation: (gsap) => {
      const tl = gsap.timeline();

      tl.fromTo(
        titleRef.current,
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, ease: 'power3.out' }
      )
        .fromTo(
          subtitleRef.current,
          { y: 30, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out' },
          '-=0.6'
        )
        .fromTo(
          iconRef.current,
          { scale: 0, opacity: 0 },
          { 
            scale: 1, 
            opacity: 1, 
            duration: 1.2, 
            ease: 'elastic.out(1, 0.3)' 
          },
          '-=0.4'
        )
        .fromTo(
          scrollIconRef.current,
          { y: 0, opacity: 0 },
          { 
            y: 0,
            opacity: 1,
            duration: 0.6,
            ease: 'power2.out',
            onComplete: () => {
              const dotElement = scrollIconRef.current?.querySelector('.scroll-dot') as HTMLElement;
              if (dotElement) {
                gsap.to(dotElement, {
                  y: '24px',
                  duration: 1.5,
                  repeat: -1,
                  yoyo: true,
                  ease: 'power2.inOut'
                });
              }
            }
          },
          '-=0.2'
        );
    },
    dependencies: [],
  });

  const handleScrollClick = () => {
    window.scrollTo({
      top: window.innerHeight,
      behavior: 'smooth'
    });
  };

  return (
    <div 
      ref={heroRef} 
      className="relative min-h-[60vh] flex flex-col items-center justify-center text-center px-4 py-20"
    >
      <div className="absolute inset-0 bg-gradient-to-b from-lofi-cream/30 to-lofi-beige/30 -z-10"></div>
      
      <div ref={iconRef} className="mb-8 p-6 bg-white/30 backdrop-blur-sm rounded-full">
        <HeadphonesIcon className="h-12 w-12 text-lofi-accent" />
      </div>
      
      <h1 
        ref={titleRef} 
        className="text-4xl md:text-5xl lg:text-6xl font-bold text-lofi-dark mb-6"
      >
        Vote Your Way to
        <span className="text-lofi-accent"> Spotify</span>
      </h1>
      
      <p 
        ref={subtitleRef} 
        className="text-lg md:text-xl text-lofi-brown max-w-2xl mb-12"
      >
        Your votes shape the future of music. The most-loved tracks make their way to 
        major streaming platforms. Be part of the journey from discovery to Spotify, 
        Apple Music, and beyond.
      </p>

      <div 
        ref={scrollIconRef}
        onClick={handleScrollClick}
        className="cursor-pointer group hover:scale-105 transition-transform mt-12 flex flex-col items-center gap-3"
        title="Scroll to discover songs"
      >
        <div className="h-12 w-6 rounded-full border-2 border-lofi-brown/60 flex items-start p-1">
          <div className="scroll-dot w-3 h-3 rounded-full bg-lofi-accent mx-auto"></div>
        </div>
        <span className="text-sm text-lofi-brown/80 group-hover:text-lofi-brown transition-colors">
          Scroll to discover
        </span>
      </div>
    </div>
  );
};

export default Hero;