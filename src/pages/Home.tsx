import { forwardRef } from 'react';
import { Card, CardMedia, CardContent, Typography, Box } from '@mui/material';
import { AnimatePresence, usePresenceData, motion } from 'motion/react';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import useSlideNavigation from '../hooks/useSlideNavigation';

type HomeProps = {
  setCloud1X: React.Dispatch<React.SetStateAction<number>>;
  setCloud2X: React.Dispatch<React.SetStateAction<number>>;
  setCloud3X: React.Dispatch<React.SetStateAction<number>>;
};

const sections = [
  { image: 'https://via.placeholder.com/300x200', title: 'Introduction', content: 'Hi! I am a web developer passionate about building impactful software.' },
  { image: 'https://via.placeholder.com/300x200', title: 'Work Experience', content: 'Company A, B, C – Full Stack Developer' },
  { image: 'https://via.placeholder.com/300x200', title: 'Education', content: 'Bachelor in Computer Science' },
  { image: 'https://via.placeholder.com/300x200', title: 'Soft Skills & Languages', content: 'Teamwork, Communication, English, Dutch, Cantonese' },
  { image: 'https://via.placeholder.com/300x200', title: 'Technical Skills', content: 'React, .NET, Vue, SQL, Git, etc.' },
  { image: 'https://via.placeholder.com/300x200', title: 'Hobbies', content: 'Gaming, Drawing, Reading, Running' },
];

const Home = ({ setCloud1X, setCloud2X, setCloud3X }: HomeProps) => {
  const { index, direction, setSlide } = useSlideNavigation(sections.length, {
    setCloud1X,
    setCloud2X,
    setCloud3X,
  });

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

      {index < sections.length - 1 && (
        <motion.button
          initial={false}
          aria-label="Next"
          style={{ position: 'absolute', right: 0, background: 'none', border: 'none', cursor: 'pointer' }}
          onClick={() => setSlide(1)}
          whileTap={{ scale: 0.9 }}
        >
          <ArrowForwardIosIcon sx={{ color: "secondary.main" }} />
        </motion.button>
      )}
    </Box>
  );
};

const Slide = forwardRef(function Slide(
  { section }: { section: { image: string; title: string; content: string } },
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
        <CardMedia
          component="img"
          image={section.image}
          alt={section.title}
          sx={{
            width: { xs: '100%', sm: 160 },
            height: { xs: 160, sm: 'auto' },
            objectFit: 'cover'
          }}
        />
     <CardContent sx={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          <Typography variant="h5" sx={{ fontSize: { xs: '1.2rem', sm: '1.5rem', md: '2rem' }, color: "secondary.dark" }}>
            {section.title}
          </Typography>
          <Typography>{section.content}</Typography>
        </CardContent>
      </Card>
    </motion.div>
  );
});

export default Home;
