import { forwardRef, useEffect } from 'react';
import {
  Box, Card,  CardContent,
  Typography, CardActions, Button, CircularProgress
} from '@mui/material';
import { AnimatePresence, usePresenceData, motion } from 'motion/react';
import { useSearchParams, useNavigate } from 'react-router-dom';

import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

import { useProjectStore } from '../store/useProjectStore';
import useSlideNavigation from '../hooks/useSlideNavigation';

type ProjectsProps = {
  setCloud1X: React.Dispatch<React.SetStateAction<number>>;
  setCloud2X: React.Dispatch<React.SetStateAction<number>>;
  setCloud3X: React.Dispatch<React.SetStateAction<number>>;
};

const Projects = ({ setCloud1X, setCloud2X, setCloud3X }: ProjectsProps) => {
  const { projects, loading, fetchProjects } = useProjectStore();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const initialIndex = parseInt(searchParams.get('index') || '0', 10);
  useEffect(() => {
    fetchProjects();
  }, [fetchProjects]);

  const { index, direction, setSlide } = useSlideNavigation(
    'projects',
    projects.length,
    { setCloud1X, setCloud2X, setCloud3X },
    {
      onNavigateToHome: (slideIndex) => navigate(`/?index=${slideIndex}`),
      onNavigateToContact: (slideIndex) => navigate(`/contact?index=${slideIndex}`),
    },
    initialIndex
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
  
        <motion.button
          initial={false}
          aria-label="Previous"
          style={{ position: 'absolute', left: 0, background: 'none', border: 'none', cursor: 'pointer' }}
          onClick={() => setSlide(-1)}
          whileTap={{ scale: 0.9 }}
        >
          <ArrowBackIosIcon sx={{ color: "secondary.main" }} />
        </motion.button>


      <Box width="100%" maxWidth={{ xs: 300, sm: 500, md: 600 }} mx="auto">
        <AnimatePresence custom={direction} initial={false} mode="popLayout">
          <ProjectSlide key={projects[index].id} project={projects[index]} />
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

const ProjectSlide = forwardRef(function ProjectSlide(
  { project }: { project: { name: string; description: string; image: string; link: string } },
  ref: React.Ref<HTMLDivElement>
) {
  const direction = usePresenceData();

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: direction * 300 }}
      animate={{ opacity: 1, x: 0, transition: { delay: 0.1, type: 'spring', bounce: 0.3 } }}
      exit={{ opacity: 0, x: direction * -300 }}
    >
      <Card sx={{
        opacity: 0.7,
        display: 'flex',
        flexDirection: { xs: 'column', sm: 'row' },
        alignItems: 'center',
        width: '100%',
      }}>
        {/* <CardMedia
          component="img"
          image={project.image}
          alt={project.name}
          sx={{
            width: { xs: '100%', sm: 160 },
            height: { xs: 160, sm: 'auto' },
            objectFit: 'cover'
          }}
        /> */}
        <CardContent sx={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          <Typography variant="h5" sx={{ fontSize: { xs: '1.2rem', sm: '1.5rem', md: '2rem' }, color: "secondary.dark" }}>
            {project.name}
          </Typography>
          <Typography>{project.description}</Typography>
          <CardActions sx={{ justifyContent: 'flex-end', paddingX: 0 }}>
            <Button variant="contained" sx={{ backgroundColor: 'secondary.light', color: 'secondary.main' }} size="small" href={project.link} target="_blank" rel="noopener noreferrer">
              View
            </Button>
          </CardActions>
        </CardContent>
      </Card>
    </motion.div>
  );
});

export default Projects;
