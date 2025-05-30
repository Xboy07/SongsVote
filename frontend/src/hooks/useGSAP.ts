import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface UseGSAPOptions {
  animation: (gsapInstance: typeof gsap) => void;
  dependencies?: any[];
}

export const useGSAP = ({ animation, dependencies = [] }: UseGSAPOptions) => {
  const ctx = useRef(gsap.context(() => {}));

  useEffect(() => {
    ctx.current = gsap.context(() => {
      animation(gsap);
    });

    return () => {
      ctx.current.revert();
    };
  }, dependencies);

  return ctx;
};

export const useSongCardAnimation = (elementRef: React.RefObject<HTMLDivElement>) => {
  useEffect(() => {
    if (elementRef.current) {
      const element = elementRef.current;
      
      ScrollTrigger.create({
        trigger: element,
        start: 'top bottom-=100',
        onEnter: () => {
          gsap.fromTo(
            element,
            { 
              y: 50, 
              opacity: 0 
            },
            { 
              y: 0, 
              opacity: 1, 
              duration: 0.8, 
              ease: 'power3.out' 
            }
          );
        },
        once: true
      });
    }
  }, [elementRef]);
};

export const useVoteAnimation = (elementRef: React.RefObject<HTMLDivElement>) => {
  const animate = () => {
    if (elementRef.current) {
      gsap.fromTo(
        elementRef.current,
        { scale: 1 },
        { 
          scale: 1.2, 
          duration: 0.2, 
          ease: 'power2.out',
          yoyo: true,
          repeat: 1
        }
      );
    }
  };

  return animate;
};