import { useEffect, useState, useMemo, forwardRef, useImperativeHandle, useCallback } from 'react';
import { motion, AnimatePresence, type Transition } from 'framer-motion';
import './RotatingText.css';

export interface RotatingTextRef {
  next: () => void;
  previous: () => void;
  jumpTo: (index: number) => void;
  reset: () => void;
}

interface RotatingTextProps {
  texts: string[];
  rotationInterval?: number;
  transition?: Transition;
  mainClassName?: string;
  splitLevelClassName?: string;
  staggerDuration?: number;
  staggerFrom?: 'first' | 'last' | 'center';
}

const RotatingText = forwardRef<RotatingTextRef, RotatingTextProps>(
  (
    {
      texts,
      rotationInterval = 2500,
      transition = { type: 'spring', damping: 30, stiffness: 400 },
      mainClassName = '',
      splitLevelClassName = '',
      staggerDuration = 0.025,
      staggerFrom = 'first',
    },
    ref
  ) => {
    const [currentIndex, setCurrentIndex] = useState(0);

    const next = useCallback(() => {
      setCurrentIndex((prev) => (prev + 1) % texts.length);
    }, [texts.length]);

    const previous = useCallback(() => {
      setCurrentIndex((prev) => (prev - 1 + texts.length) % texts.length);
    }, [texts.length]);

    const jumpTo = useCallback((index: number) => {
      setCurrentIndex(index % texts.length);
    }, [texts.length]);

    const reset = useCallback(() => {
      setCurrentIndex(0);
    }, []);

    useImperativeHandle(ref, () => ({
      next,
      previous,
      jumpTo,
      reset,
    }));

    useEffect(() => {
      const interval = setInterval(next, rotationInterval);
      return () => clearInterval(interval);
    }, [next, rotationInterval]);

    const currentText = texts[currentIndex];
    const characters = useMemo(() => currentText.split(''), [currentText]);

    const getStaggerDelay = (index: number, total: number) => {
      switch (staggerFrom) {
        case 'last':
          return (total - 1 - index) * staggerDuration;
        case 'center':
          return Math.abs(index - Math.floor(total / 2)) * staggerDuration;
        default:
          return index * staggerDuration;
      }
    };

    return (
      <span className={`text-rotate ${mainClassName}`}>
        <span className="text-rotate-sr-only">{currentText}</span>
        <AnimatePresence mode="wait">
          <motion.span
            key={currentIndex}
            className={`text-rotate-word ${splitLevelClassName}`}
            aria-hidden="true"
          >
            {characters.map((char, index) => (
              <motion.span
                key={`${currentIndex}-${index}`}
                className="text-rotate-element"
                initial={{ y: '100%', opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: '-120%', opacity: 0 }}
                transition={{
                  ...transition,
                  delay: getStaggerDelay(index, characters.length),
                }}
              >
                {char === ' ' ? '\u00A0' : char}
              </motion.span>
            ))}
          </motion.span>
        </AnimatePresence>
      </span>
    );
  }
);

RotatingText.displayName = 'RotatingText';

export default RotatingText;
