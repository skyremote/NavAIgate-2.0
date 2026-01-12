import React from 'react';

type GradientPreset = 'default' | 'blue-purple' | 'purple-teal' | 'rainbow';
type ElementType = 'span' | 'h1' | 'h2' | 'h3' | 'p';

interface GradientTextProps {
  children: React.ReactNode;
  gradient?: GradientPreset;
  className?: string;
  as?: ElementType;
}

const gradientClasses: Record<GradientPreset, string> = {
  default: 'from-blue-400 via-purple-400 to-teal-400',
  'blue-purple': 'from-blue-400 to-purple-400',
  'purple-teal': 'from-purple-400 to-teal-400',
  rainbow: 'from-blue-400 via-purple-400 via-pink-400 to-orange-400',
};

const GradientText: React.FC<GradientTextProps> = ({
  children,
  gradient = 'default',
  className = '',
  as: Component = 'span',
}) => {
  return (
    <Component
      className={`bg-gradient-to-r ${gradientClasses[gradient]} bg-clip-text text-transparent ${className}`}
    >
      {children}
    </Component>
  );
};

export default GradientText;
