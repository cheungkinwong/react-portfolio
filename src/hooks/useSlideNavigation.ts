import { useState, useCallback, useEffect } from 'react';
import { wrap } from 'motion/react';

type CloudSetters = {
  setCloud1X: React.Dispatch<React.SetStateAction<number>>;
  setCloud2X: React.Dispatch<React.SetStateAction<number>>;
  setCloud3X: React.Dispatch<React.SetStateAction<number>>;
};

type PageType = 'home' | 'projects' | 'contact';

interface UseSlideNavigationOptions {
  onNavigateToHome?: (slideIndex: number) => void;
  onNavigateToProjects?: (slideIndex: number) => void;
  onNavigateToContact?: (slideIndex: number) => void;
}

const useSlideNavigation = (
  page: PageType,
  length: number,
  clouds?: CloudSetters,
  options?: UseSlideNavigationOptions,
  initialIndex = 0,
  setSearchParams?: (params: URLSearchParams) => void
) => {
  const [index, setIndex] = useState(initialIndex);
  const [direction, setDirection] = useState<1 | -1>(1);

  const setSlide = useCallback(
    (newDirection: 1 | -1) => {
      let next = index + newDirection;

      switch (page) {
        case 'home':
          if (next < 0) return;
          if (next >= length) {
            options?.onNavigateToProjects?.(0);
            return;
          }
          break;

        case 'projects':
          if (next < 0) {
            options?.onNavigateToHome?.(length - 1);
            return;
          }
          if (next >= length) {
            options?.onNavigateToContact?.(0);
            return;
          }
          break;

        case 'contact':
          if (next < 0) {
            options?.onNavigateToProjects?.(length - 1);
            return;
          }
          if (next >= length) return;
          break;
      }

      next = wrap(0, length, next);
      setIndex(next);
      setDirection(newDirection);

      if (setSearchParams) {
        setSearchParams(new URLSearchParams({ index: next.toString() }));
      }

      if (clouds) {
        clouds.setCloud1X(prev => prev + newDirection * -100);
        clouds.setCloud2X(prev => prev + newDirection * -150);
        clouds.setCloud3X(prev => prev + newDirection * -200);
      }
    },
    [index, length, clouds, page, options, setSearchParams]
  );

  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      if (e.deltaY > 0) setSlide(1);
      else if (e.deltaY < 0) setSlide(-1);
    };

    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') setSlide(1);
      else if (e.key === 'ArrowLeft') setSlide(-1);
    };

    window.addEventListener('wheel', handleWheel);
    window.addEventListener('keydown', handleKey);
    return () => {
      window.removeEventListener('wheel', handleWheel);
      window.removeEventListener('keydown', handleKey);
    };
  }, [setSlide]);

  return { index, direction, setSlide };
};

export default useSlideNavigation;
