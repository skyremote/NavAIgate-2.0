import { useMemo, useState } from 'react';
import './LogoLoop.css';

export interface LogoItem {
  src: string;
  alt: string;
  href?: string;
  scale?: number;
}

interface LogoLoopProps {
  logos: LogoItem[];
  speed?: number;
  reverse?: boolean;
  pauseOnHover?: boolean;
  fadeOut?: boolean;
  scaleOnHover?: boolean;
  logoHeight?: number;
  gap?: number;
  className?: string;
}

const LogoLoop: React.FC<LogoLoopProps> = ({
  logos,
  speed = 30,
  reverse = false,
  pauseOnHover = true,
  fadeOut = true,
  scaleOnHover = true,
  logoHeight = 40,
  gap = 48,
  className = '',
}) => {
  const [isPaused, setIsPaused] = useState(false);

  // Duplicate logos for seamless loop
  const duplicatedLogos = useMemo(() => [...logos, ...logos, ...logos, ...logos], [logos]);

  const classNames = [
    'logoloop',
    reverse && 'logoloop--reverse',
    isPaused && 'logoloop--paused',
    fadeOut && 'logoloop--fade',
    scaleOnHover && 'logoloop--scale-hover',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  const style = {
    '--logoloop-duration': `${speed}s`,
    '--logoloop-logoHeight': `${logoHeight}px`,
    '--logoloop-gap': `${gap}px`,
  } as React.CSSProperties;

  return (
    <div
      className={classNames}
      style={style}
      onMouseEnter={() => pauseOnHover && setIsPaused(true)}
      onMouseLeave={() => pauseOnHover && setIsPaused(false)}
      aria-label="Client logos"
      role="marquee"
    >
      <div className="logoloop__track">
        {duplicatedLogos.map((logo, index) => {
          const imgStyle = logo.scale ? { transform: `scale(${logo.scale})` } : undefined;
          return (
            <div key={`${logo.alt}-${index}`} className="logoloop__item">
              {logo.href ? (
                <a href={logo.href} target="_blank" rel="noopener noreferrer">
                  <img src={logo.src} alt={logo.alt} loading="lazy" style={imgStyle} />
                </a>
              ) : (
                <img src={logo.src} alt={logo.alt} loading="lazy" style={imgStyle} />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default LogoLoop;
