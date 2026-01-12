import { forwardRef } from 'react';

interface SectionProps extends React.HTMLAttributes<HTMLElement> {
  id?: string;
  background?: 'none' | 'gradient';
  fullHeight?: boolean;
  centered?: boolean;
  children: React.ReactNode;
}

const Section = forwardRef<HTMLElement, SectionProps>(
  (
    {
      id,
      background = 'none',
      fullHeight = false,
      centered = false,
      className = '',
      children,
      ...props
    },
    ref
  ) => {
    const heightClass = fullHeight ? 'min-h-screen' : '';
    const centerClass = centered ? 'flex items-center justify-center' : '';

    return (
      <section
        ref={ref}
        id={id}
        className={`relative overflow-hidden py-20 px-6 ${heightClass} ${centerClass} ${className}`}
        {...props}
      >
        {background === 'gradient' && (
          <div className="absolute inset-0 animated-gradient opacity-20 pointer-events-none" />
        )}
        <div className="relative z-10 w-full">{children}</div>
      </section>
    );
  }
);

Section.displayName = 'Section';

export default Section;
