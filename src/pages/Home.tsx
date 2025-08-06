import { forwardRef, useEffect } from 'react';
import { Card,CardContent ,Typography, Box, CircularProgress, IconButton } from '@mui/material';
import { AnimatePresence, usePresenceData, motion } from 'motion/react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

import { useImageExists } from '../hooks/useImageExist';
import useSlideNavigation from '../hooks/useSlideNavigation';
import { useSectionStore } from '../store/useSectionStore';

import EducationSection from '../components/sections/EducationSection';
import WorkExperienceSection from '../components/sections/WorkExperienceSection';
import TechnicalSkillSection from '../components/sections/TechnicalSkillSection';
import SoftSkillSection from '../components/sections/SoftSkillSection';
import HobbySection from '../components/sections/HobbySection';

type HomeProps = {
  setCloud1X: React.Dispatch<React.SetStateAction<number>>;
  setCloud2X: React.Dispatch<React.SetStateAction<number>>;
  setCloud3X: React.Dispatch<React.SetStateAction<number>>;
};

const getSectionComponent = (sectionId: number) => {
  switch (sectionId) {
    case 2: return <EducationSection />;
    case 3: return <WorkExperienceSection />;
    case 4: return <TechnicalSkillSection />;
    case 5: return <SoftSkillSection />;
    case 6: return <HobbySection />;
    default: return null;
  }
};

const Home = ({ setCloud1X, setCloud2X, setCloud3X }: HomeProps) => {
  const { sections, loading, fetchSections } = useSectionStore();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const initialIndex = parseInt(searchParams.get('index') || '0', 10);
  useEffect(() => {
    if (sections.length === 0) {
      fetchSections();
    }
  }, [sections, fetchSections]);

  const { index, direction, setSlide } = useSlideNavigation(
    'home',
    { setCloud1X, setCloud2X, setCloud3X },
    { 
      onNavigateToProjects: (slideIndex) => navigate(`/projects?index=${slideIndex}`),
    },    initialIndex, setSearchParams
  );

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="80vh">
        <CircularProgress />
      </Box>
    );
  }

  if (sections.length === 0) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="80vh">
        <Typography>No sections found.</Typography>
      </Box>
    );
  }

  return (
    <Box display="flex" alignItems="center" justifyContent="center" position="relative" height="80vh" zIndex={4}>
      {index > 0 && (
        <IconButton
          aria-label="previous"
          onClick={() => setSlide(-1)}
          sx={{
            position: 'absolute',
            left: 0,
            border: 'none',
            cursor: 'pointer',
            backgroundColor: 'transparent',
            '&:hover': {
              backgroundColor: 'rgba(255, 255, 255, 0.85)',
            },
          }}
        >
          <ArrowBackIosIcon sx={{ color: 'secondary.main', ml:'4px' }} />
        </IconButton>
      )}

      <Box width="100%" maxWidth={{ xs: 300, sm: 500, md: 600 }} mx="auto">
        <AnimatePresence custom={direction} initial={false} mode="popLayout">
          <Slide key={index} section={sections[index]} />
        </AnimatePresence>
      </Box>

        <IconButton
          aria-label="Next"
          onClick={() => setSlide(1)}
          sx={{
            position: 'absolute',
            right: 0,
            border: 'none',
            cursor: 'pointer',
            backgroundColor: 'transparent',
            '&:hover': {
              backgroundColor: 'rgba(255, 255, 255, 0.85)',
            },
          }}
        >
          <ArrowForwardIosIcon sx={{ color: 'secondary.main' }} />
        </IconButton>


    </Box>
  );
};

const Slide = forwardRef(function Slide(
  { section }: { section: { id: number; image: string; imageUrl: string; altText: string; title: string; description: string } },
  ref: React.Ref<HTMLDivElement>
) {
  const direction = usePresenceData();
  const imageExists = useImageExists(section.imageUrl);
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: direction * 300 }}
      animate={{ opacity: 1, x: 0, transition: { delay: 0.1, type: 'spring', bounce: 0.3 } }}
      exit={{ opacity: 0, x: direction * -300 }}
    >
      <Card
        sx={{
          opacity: 0.85,
          display: 'flex',
          flexDirection: { xs: 'column', sm: 'row' },
          alignItems: 'stretch', 
          width: '100%',
          overflow: 'visible', 
        }}
      >
        {imageExists && (
          <Box
            sx={{
              width: { xs: '100%', sm: 260 }, 
              position: 'relative',
              flexShrink: 0,
              minHeight: { xs: 260, sm: 'auto' }, 
            }}
          >
            <Box
              component="img"
              src={section.imageUrl}
              alt={section.altText}
              sx={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                borderTopLeftRadius: { xs: 4, sm: 4 },
                borderBottomLeftRadius: { xs: 4, sm: 4 }, 
              }}
            />
          </Box>
        )}

        <CardContent
          sx={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
          }}
        >
          <Typography
            variant="h5"
            sx={{
              fontSize: { xs: '1.2rem', sm: '1.5rem', md: '2rem' },
              color: 'secondary.dark',
            }}
          >
            {section.title}
          </Typography>
          <Typography sx={{ mb: 2 }}>{section.description}</Typography>
          {getSectionComponent(section.id)}
        </CardContent>
      </Card>

    </motion.div>
  );
});

export default Home;
