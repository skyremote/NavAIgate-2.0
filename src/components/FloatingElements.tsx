interface FloatingElement {
  position: string;
  size: string;
  color: string;
  blur: string;
  animation: string;
}

interface FloatingElementsProps {
  variant?: 'hero' | 'section' | 'minimal';
  className?: string;
}

const variants: Record<string, FloatingElement[]> = {
  hero: [
    {
      position: 'top-20 left-10',
      size: 'w-20 h-20',
      color: 'bg-blue-500/20',
      blur: 'blur-xl',
      animation: 'float',
    },
    {
      position: 'top-40 right-20',
      size: 'w-32 h-32',
      color: 'bg-purple-500/20',
      blur: 'blur-xl',
      animation: 'float-reverse',
    },
    {
      position: 'bottom-20 left-1/4',
      size: 'w-24 h-24',
      color: 'bg-teal-500/20',
      blur: 'blur-xl',
      animation: 'pulse-slow',
    },
  ],
  section: [
    {
      position: 'top-0 left-1/4',
      size: 'w-64 h-64',
      color: 'bg-blue-500/10',
      blur: 'blur-3xl',
      animation: 'float',
    },
    {
      position: 'bottom-0 right-1/4',
      size: 'w-80 h-80',
      color: 'bg-purple-500/10',
      blur: 'blur-3xl',
      animation: 'float-reverse',
    },
  ],
  minimal: [
    {
      position: 'top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2',
      size: 'w-96 h-96',
      color: 'bg-purple-500/5',
      blur: 'blur-3xl',
      animation: 'pulse-slow',
    },
  ],
};

const FloatingElements: React.FC<FloatingElementsProps> = ({
  variant = 'hero',
  className = '',
}) => {
  const elements = variants[variant];

  return (
    <div className={`absolute inset-0 pointer-events-none overflow-hidden ${className}`}>
      {elements.map((element, index) => (
        <div
          key={index}
          className={`absolute rounded-full ${element.position} ${element.size} ${element.color} ${element.blur} ${element.animation}`}
        />
      ))}
    </div>
  );
};

export default FloatingElements;
