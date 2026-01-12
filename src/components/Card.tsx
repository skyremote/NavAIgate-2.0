import React, { forwardRef } from 'react';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'glass' | 'solid' | 'outline';
  hover?: boolean;
  padding?: 'none' | 'sm' | 'md' | 'lg';
  children: React.ReactNode;
}

const paddingClasses = {
  none: '',
  sm: 'p-4',
  md: 'p-6',
  lg: 'p-8',
};

const variantClasses = {
  glass: 'glass',
  solid: 'bg-gray-800/50 border border-gray-700',
  outline: 'border border-gray-700 bg-transparent',
};

const Card = forwardRef<HTMLDivElement, CardProps>(
  ({
    variant = 'glass',
    hover = false,
    padding = 'md',
    className = '',
    children,
    ...props
  }, ref) => {
    const hoverClass = hover ? 'hover-lift cursor-pointer' : '';

    return (
      <div
        ref={ref}
        className={`rounded-2xl ${variantClasses[variant]} ${paddingClasses[padding]} ${hoverClass} ${className}`}
        {...props}
      >
        {children}
      </div>
    );
  }
);

Card.displayName = 'Card';

export default Card;
