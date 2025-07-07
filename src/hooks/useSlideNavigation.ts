import { useState, useCallback, useEffect } from 'react';
import { wrap } from 'motion/react';

type CloudSetters = {
  setCloud1X: React.Dispatch<React.SetStateAction<number>>;
  setCloud2X: React.Dispatch<React.SetStateAction<number>>;
  setCloud3X: React.Dispatch<React.SetStateAction<number>>;
};

const useSlideNavigation = (
  length: number,
  clouds?: CloudSetters
) => {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState<1 | -1>(1);

  const setSlide = useCallback(
    (newDirection: 1 | -1) => {
      const next = wrap(0, length, index + newDirection);
      setIndex(next);
      setDirection(newDirection);

      if (clouds) {
        clouds.setCloud1X(prev => prev + newDirection * -100);
        clouds.setCloud2X(prev => prev + newDirection * -150);
        clouds.setCloud3X(prev => prev + newDirection * -200);
      }
    },
    [index, length, clouds]
  );

  const handleWheel = useCallback(
    (e: WheelEvent) => {
      if (e.deltaY > 0 && index < length - 1) setSlide(1);
      if (e.deltaY < 0 && index > 0) setSlide(-1);
    },
    [index, length, setSlide]
  );

  const handleKey = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' && index < length - 1) setSlide(1);
      if (e.key === 'ArrowLeft' && index > 0) setSlide(-1);
    },
    [index, length, setSlide]
  );

  useEffect(() => {
    window.addEventListener('wheel', handleWheel);
    window.addEventListener('keydown', handleKey);
    return () => {
      window.removeEventListener('wheel', handleWheel);
      window.removeEventListener('keydown', handleKey);
    };
  }, [handleWheel, handleKey]);

  return { index, direction, setSlide };
};

export default useSlideNavigation;
