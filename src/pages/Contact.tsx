import {
  Box,
  Card,
  CardContent,
  Typography,
  IconButton,
  Link,
  CardActions, Button,
} from '@mui/material';
import { motion } from 'motion/react';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { useSearchParams, useNavigate } from 'react-router-dom';
import useSlideNavigation from '../hooks/useSlideNavigation';
import api from '../api/apiClient'; 
import { getAPIUrl, getBaseUrl } from '../utils/api'; 
const baseUrl = getBaseUrl()
const apiUrl = getAPIUrl()
const imageUrl = `${baseUrl}/images/handshake.jpg`;
const downloadCv = async () => {
  try {
    const response = await api.get(`${apiUrl}/cv/download`, {
      responseType: 'blob', 
    })
    const blob = new Blob([response.data], { type: 'application/pdf' })
    const url = window.URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.setAttribute('download', 'cv-cheungkinwong.pdf')
    document.body.appendChild(link)
    link.click()
    link.remove()
  } catch (error) {
    console.error('Download failed:', error)
  }
}

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
  const [searchParams, setSearchParams] = useSearchParams();
  const initialIndex = parseInt(searchParams.get('index') || '0', 10);

  const { direction, setSlide } = useSlideNavigation(
    'contact',
    { setCloud1X, setCloud2X, setCloud3X },
    {
      onNavigateToProjects: (slideIndex) => navigate(`/projects?index=${slideIndex}`),
    },
    initialIndex,
    setSearchParams
  );

  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="center"
      position="relative"
      height="80vh"
      zIndex={4}
    >
      <IconButton
        aria-label="previous"
        onClick={() => setSlide(-1)}
        sx={{
          position: 'absolute',
          left: 0,
          top: '50%',
          transform: 'translateY(-50%)',
          border: 'none',
          cursor: 'pointer',
          backgroundColor: 'transparent',
          '&:hover': {
            backgroundColor: 'rgba(255, 255, 255, 0.85)',
          },
        }}
      >
        <ArrowBackIosIcon sx={{ color: 'secondary.main', ml: '4px' }} />
      </IconButton>

      <Box width="100%" maxWidth={{ xs: 300, sm: 500, md: 600 }} mx="auto">
        <motion.div
          key="contact-slide"
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
                src={imageUrl}
                alt="Contact image"
                sx={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  borderTopLeftRadius: { xs: 4, sm: 4 },
                  borderBottomLeftRadius: { xs: 0, sm: 4 },
                }}
              />
            </Box>

            <CardContent
              sx={{
                flex: 1,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
              }}
            >
              <Typography variant="h5" sx={{ fontSize: { xs: '1.2rem', sm: '1.5rem', md: '2rem' }, color: 'secondary.dark' }}>
                Contact Me
              </Typography>
              <Typography>
                <Link href="mailto:cheungkin.wong@gmail.com" target="_blank" sx={{ color: 'secondary.main', textDecoration: 'none' }}>
                  cheungkin.wong@gmail.com
                </Link>
                </Typography>
              <Typography>+32 485 47 41 48</Typography>
              <Typography>
                <Link
                  href="https://www.linkedin.com/in/cheungkin/"
                  target="_blank"
                  rel="noopener noreferrer"
                  sx={{ color: 'secondary.main', textDecoration: 'none' }}
                >
                  www.linkedin.com/in/cheungkin/
                </Link>
              </Typography>
              <Typography>Antwerp, Belgium</Typography>
              <CardActions sx={{ justifyContent: 'flex-end', paddingX: 0 }}>
                <Button variant="contained" sx={{ backgroundColor: 'secondary.light', color: 'secondary.main' }} size="small" onClick={downloadCv}>
                      Download CV
                </Button>
              </CardActions>
            </CardContent>
  
          </Card>
        </motion.div>
      </Box>
    </Box>
  );
};

export default Contact;
