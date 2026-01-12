import React, { forwardRef } from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  shimmer?: boolean;
  icon?: React.ReactNode;
  asChild?: boolean;
}

const sizeClasses = {
  sm: 'px-4 py-2 text-sm',
  md: 'px-6 py-3 text-base',
  lg: 'px-10 py-5 text-xl',
};

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({
    variant = 'primary',
    size = 'md',
    shimmer = false,
    icon,
    className = '',
    children,
    ...props
  }, ref) => {
    const baseClasses = 'inline-flex items-center justify-center font-medium transition-all duration-300 rounded-full group';

    const variantClasses = {
      primary: 'bg-gradient-to-r from-blue-500 to-purple-600 text-white hover:from-blue-600 hover:to-purple-700 hover:scale-105 shadow-lg hover:shadow-2xl',
      secondary: 'text-gray-300 hover:text-white bg-transparent',
      outline: 'border-2 border-gray-600 text-gray-300 hover:border-white hover:text-white bg-transparent',
    };

    const shimmerClass = shimmer ? 'btn-shimmer' : '';

    return (
      <button
        ref={ref}
        className={`${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${shimmerClass} ${className}`}
        {...props}
      >
        {children}
        {icon && (
          <span className="ml-3 group-hover:translate-x-1 transition-transform">
            {icon}
          </span>
        )}
      </button>
    );
  }
);

Button.displayName = 'Button';

export default Button;
