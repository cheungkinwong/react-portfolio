import { useState, useCallback, useEffect } from 'react';
import { wrap } from 'motion/react';
import { useSectionStore } from '../store/useSectionStore';
import { useProjectStore } from '../store/useProjectStore';


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
  clouds?: CloudSetters,
  options?: UseSlideNavigationOptions,
  initialIndex = 0,
  setSearchParams?: (params: URLSearchParams) => void
) => {
  const [index, setIndex] = useState(initialIndex);
  const [direction, setDirection] = useState<1 | -1>(1);

  const sectionStore = useSectionStore();
  const projectStore = useProjectStore();

  const homeLength = sectionStore.sections.length;
  const projectsLength = projectStore.projects.length;

  let length = 0;
  switch (page) {
    case 'home':
      length = homeLength;
      break;
    case 'projects':
      length = projectsLength;
      break;
    case 'contact':
      length = 1;
      break;
  }

  const setSlide = useCallback(
    (newDirection: 1 | -1) => {
      let next = index + newDirection;

      switch (page) {
        case 'home':
          if (next < 0) return;
          if (next >= homeLength) {
            options?.onNavigateToProjects?.(0);
            return;
          }
          break;

        case 'projects':
          if (next < 0) {
            options?.onNavigateToHome?.(homeLength - 1);
            return;
          }
          if (next >= projectsLength) {
            options?.onNavigateToContact?.(0);
            return;
          }
          break;

        case 'contact':
          if (next < 0) {
            options?.onNavigateToProjects?.(projectsLength - 1);
            return;
          }
          if (next >= 1) return;
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
    [index, clouds, length, page, options, homeLength, projectsLength, setSearchParams]
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

    if (index >= length) {
      setIndex(length > 0 ? length - 1 : 0);
    }

    window.addEventListener('wheel', handleWheel);
    window.addEventListener('keydown', handleKey);
    return () => {
      window.removeEventListener('wheel', handleWheel);
      window.removeEventListener('keydown', handleKey);
    };


  }, [setSlide, index, length]);

  return { index, direction, setSlide };
};

export default useSlideNavigation;
