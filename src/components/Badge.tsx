import React from 'react';

interface BadgeProps {
  variant?: 'glass' | 'solid' | 'gradient';
  size?: 'sm' | 'md';
  icon?: React.ReactNode;
  className?: string;
  children: React.ReactNode;
  as?: 'span' | 'div';
}

const sizeClasses = {
  sm: 'px-3 py-1 text-xs',
  md: 'px-4 py-2 text-sm',
};

const variantClasses = {
  glass: 'glass',
  solid: 'bg-gray-800 border border-gray-700',
  gradient: 'animated-gradient',
};

const Badge: React.FC<BadgeProps> = ({
  variant = 'glass',
  size = 'md',
  icon,
  className = '',
  children,
  as: Component = 'div',
}) => {
  return (
    <Component
      className={`inline-flex items-center rounded-full ${variantClasses[variant]} ${sizeClasses[size]} ${className}`}
    >
      {icon && <span className="mr-2">{icon}</span>}
      {children}
    </Component>
  );
};

export default Badge;
