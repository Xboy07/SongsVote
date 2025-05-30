import React, { forwardRef } from 'react';

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  opacity?: 'light' | 'medium' | 'dark';
}

const GlassCard = forwardRef<HTMLDivElement, GlassCardProps>(
  ({ children, className = '', opacity = 'medium' }, ref) => {
    const opacityClasses = {
      light: 'bg-white/20',
      medium: 'bg-white/40',
      dark: 'bg-white/60',
    };

    return (
      <div
        ref={ref}
        className={`rounded-lg backdrop-blur-md ${opacityClasses[opacity]} shadow-lg border border-white/20 p-6 transition-all duration-300 ${className}`}
      >
        {children}
      </div>
    );
  }
);

GlassCard.displayName = 'GlassCard';

export default GlassCard;