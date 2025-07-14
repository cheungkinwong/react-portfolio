import { Routes, Route, Link, useLocation } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Button, Container, CssBaseline } from '@mui/material';
import { useState, useEffect, useMemo } from 'react';
import { motion, useAnimation } from 'motion/react';

import Home from './pages/Home';
import Projects from './pages/Projects';
import Contact from './pages/Contact';
import CloudBackground from './components/cloudBackground'; 

const App = () => {
  const [cloud1X, setCloud1X] = useState(0);
  const [cloud2X, setCloud2X] = useState(0);
  const [cloud3X, setCloud3X] = useState(0);
  const location = useLocation();
  const controls = useAnimation();

  useEffect(() => {
    setCloud1X(0);
    setCloud2X(0);
    setCloud3X(0);
  }, [location.pathname]);

  const targetColor = useMemo(() => {
    switch (location.pathname) {
      case '/':
        return '#aad5f2'; 
      case '/projects':
        return '#ffa812';
      case '/contact':
        return '#040129'; 
      default:
        return '#ffffff';
    }
  }, [location.pathname]);

  useEffect(() => {
    controls.start({ backgroundColor: targetColor });
  }, [targetColor, controls]);

  return (
    <>
      <CssBaseline />
      <motion.div
        animate={controls}
        initial={false}
        transition={{ duration: 1 }}
        style={{
          position: 'relative',
          minHeight: '100vh',
          overflow: 'hidden',
          backgroundColor: targetColor, 
          zIndex: 0,
        }}
      >
        <CloudBackground x1={cloud1X} x2={cloud2X} x3={cloud3X} />

        <AppBar
          position="static"
          sx={{ backgroundColor: "secondary.light", color: "secondary.main", opacity: 0.9, zIndex: 3 }}
        >
          <Toolbar>
            <Typography variant="h6" sx={{ flexGrow: 1 }}>My Portfolio</Typography>
            <Button color="inherit" component={Link} to="/">Home</Button>
            <Button color="inherit" component={Link} to="/projects">Projects</Button>
            <Button color="inherit" component={Link} to="/contact">Contact</Button>
          </Toolbar>
        </AppBar>

        <Container sx={{ mt: 4, zIndex: 4, position: 'relative' }}>
          <Routes>
            <Route path="/" element={<Home setCloud1X={setCloud1X} setCloud2X={setCloud2X} setCloud3X={setCloud3X} />} />
            <Route path="/projects" element={<Projects setCloud1X={setCloud1X} setCloud2X={setCloud2X} setCloud3X={setCloud3X} />} />
            <Route path="/contact" element={<Contact setCloud1X={setCloud1X} setCloud2X={setCloud2X} setCloud3X={setCloud3X}  />} />
          </Routes>
        </Container>
      </motion.div>
    </>
  );
};

export default App;
