import { Card,  CardContent, Typography, Box } from '@mui/material';
import { useSearchParams, useNavigate } from 'react-router-dom';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { motion } from 'motion/react';
import useSlideNavigation from '../hooks/useSlideNavigation';

const Contact = ({
  setCloud1X,
  setCloud2X,
  setCloud3X,
}: {
  setCloud1X: React.Dispatch<React.SetStateAction<number>>;
  setCloud2X: React.Dispatch<React.SetStateAction<number>>;
  setCloud3X: React.Dispatch<React.SetStateAction<number>>;
}) => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const initialIndex = parseInt(searchParams.get('index') || '0', 10);


  const {setSlide } = useSlideNavigation(
    'contact',
    1, 
    { setCloud1X, setCloud2X, setCloud3X },
    {
      onNavigateToProjects: (slideIndex) => navigate(`/projects?index=${slideIndex}`),
    },
    initialIndex
);

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

      <Card sx={{ maxWidth: 600, opacity: 0.85 }}>
        {/* <CardMedia
          component="img"
          height="200"
          image="https://via.placeholder.com/600x200"
          alt="Contact"
        /> */}
        <CardContent>
          <Typography variant="h6" gutterBottom>Contact Me</Typography>
          <Typography>Email: example@mail.com</Typography>
          <Typography>Phone: +32 123 456 789</Typography>
          <Typography>LinkedIn: linkedin.com/in/yourname</Typography>
          <Typography>Location: Antwerp, Belgium</Typography>
        </CardContent>
      </Card>
    </Box>
  );
};

export default Contact;
