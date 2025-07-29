import { forwardRef, useEffect } from 'react';
import { Card,CardContent, CardMedia ,Typography, Box, CircularProgress } from '@mui/material';
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
        <motion.button
          initial={false}
          aria-label="Previous"
          style={{ position: 'absolute', left: 0, background: 'none', border: 'none', cursor: 'pointer' }}
          onClick={() => setSlide(-1)}
          whileTap={{ scale: 0.9 }}
        >
          <ArrowBackIosIcon sx={{ color: "secondary.main" }} />
        </motion.button>
      )}

      <Box width="100%" maxWidth={{ xs: 300, sm: 500, md: 600 }} mx="auto">
        <AnimatePresence custom={direction} initial={false} mode="popLayout">
          <Slide key={index} section={sections[index]} />
        </AnimatePresence>
      </Box>

  
        <motion.button
          initial={false}
          aria-label="Next"
          style={{ position: 'absolute', right: 0, background: 'none', border: 'none', cursor: 'pointer' }}
          onClick={() => setSlide(1)}
          whileTap={{ scale: 0.9 }}
        >
          <ArrowForwardIosIcon sx={{ color: "secondary.main" }} />
        </motion.button>

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
      <Card sx={{
        opacity: 0.85,
        display: 'flex',
        flexDirection: { xs: 'column', sm: 'row' },
        alignItems: 'center',
        width: '100%',
      }}>
        {imageExists && (
          <CardMedia
            component="img"
            image={section.imageUrl}
            alt={section.altText}
            sx={{
              width: { xs: '100%', sm: 260 },
              height: { xs: 260, sm: 'auto' },
              objectFit: 'cover'
            }}
          />
        )}
        <CardContent sx={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          <Typography variant="h5" sx={{ fontSize: { xs: '1.2rem', sm: '1.5rem', md: '2rem' }, color: "secondary.dark" }}>
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
