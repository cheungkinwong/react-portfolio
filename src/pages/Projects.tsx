import { forwardRef, useEffect } from 'react';
import {
  Box, Card,  CardContent,
  Typography, CardActions, Button, CircularProgress, IconButton
} from '@mui/material';
import { AnimatePresence, usePresenceData, motion } from 'motion/react';
import { useSearchParams, useNavigate } from 'react-router-dom';

import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

import { useProjectStore } from '../store/useProjectStore';
import useSlideNavigation from '../hooks/useSlideNavigation';
import { useImageExists } from '../hooks/useImageExist';

type ProjectsProps = {
  setCloud1X: React.Dispatch<React.SetStateAction<number>>;
  setCloud2X: React.Dispatch<React.SetStateAction<number>>;
  setCloud3X: React.Dispatch<React.SetStateAction<number>>;
};

const Projects = ({ setCloud1X, setCloud2X, setCloud3X }: ProjectsProps) => {
  const { projects, loading, fetchProjects } = useProjectStore();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const initialIndex = parseInt(searchParams.get('index') || '0', 10);
  useEffect(() => {
    if (projects.length === 0) {
      fetchProjects();
    }
  }, [projects, fetchProjects]);


  const { index, direction, setSlide } = useSlideNavigation(
    'projects',
    { setCloud1X, setCloud2X, setCloud3X },
    {
      onNavigateToHome: (slideIndex) => navigate(`/?index=${slideIndex}`),
      onNavigateToContact: (slideIndex) => navigate(`/contact?index=${slideIndex}`),
    },
    initialIndex, setSearchParams
  );

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="80vh">
        <CircularProgress />
      </Box>
    );
  }

  if (projects.length === 0) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="80vh">
        <Typography>No projects found.</Typography>
      </Box>
    );
  }

  return (
    <Box display="flex" alignItems="center" justifyContent="center" position="relative" height="80vh" zIndex={4}>
  
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


      <Box width="100%" maxWidth={{ xs: 300, sm: 500, md: 600 }} mx="auto">
        <AnimatePresence custom={direction} initial={false} mode="popLayout">
          <ProjectSlide key={projects[index].id} project={projects[index]} />
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

const ProjectSlide = forwardRef(function ProjectSlide(
  { project }: { project: { name: string; description: string; image: string; imageUrl: string; altText: string; link: string } },
  ref: React.Ref<HTMLDivElement>
) {
  const direction = usePresenceData();
  const imageExists = useImageExists(project.imageUrl);
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
                    src={project.imageUrl}
                    alt={project.altText}
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
                <Typography variant="h5" sx={{ fontSize: { xs: '1.2rem', sm: '1.5rem', md: '2rem' }, color: "secondary.dark" }}>
                    {project.name}
                  </Typography>
                <Typography>{project.description}</Typography>
                <CardActions sx={{ justifyContent: 'flex-end', paddingX: 0 }}>
                    <Button variant="contained" sx={{ backgroundColor: 'secondary.light', color: 'secondary.main' }} size="small" href={project.link} target="_blank" rel="noopener noreferrer">
                      Github
                    </Button>
                </CardActions>
              </CardContent>
            </Card>
    </motion.div>
  );
});

export default Projects;
