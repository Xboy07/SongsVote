import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
  isLoading?: boolean;
  fullWidth?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  children,
  isLoading = false,
  fullWidth = false,
  className = '',
  ...props
}) => {
  const baseStyles = 'rounded-md font-medium transition-all duration-200 flex items-center justify-center';
  
  const variantStyles = {
    primary: 'bg-lofi-accent text-white hover:bg-lofi-dark',
    secondary: 'bg-lofi-beige text-lofi-dark hover:bg-lofi-cream',
    outline: 'border border-lofi-brown text-lofi-dark hover:bg-lofi-cream',
    ghost: 'text-lofi-dark hover:bg-lofi-cream',
  };
  
  const sizeStyles = {
    sm: 'text-sm px-2 py-1',
    md: 'text-base px-4 py-2',
    lg: 'text-lg px-6 py-3',
  };
  
  const widthClass = fullWidth ? 'w-full' : '';
  const loadingClass = isLoading ? 'opacity-70 cursor-not-allowed' : '';
  
  return (
    <button
      className={`${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${widthClass} ${loadingClass} ${className}`}
      disabled={isLoading || props.disabled}
      {...props}
    >
      {isLoading ? (
        <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-t-transparent" />
      ) : null}
      {children}
    </button>
  );
};

export default Button;