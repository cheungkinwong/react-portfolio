import { motion } from 'motion/react';
import cloud1 from '../assets/cloud1.png';
import cloud2 from '../assets/cloud2.png';
import cloud3 from '../assets/cloud3.png';

type Props = {
  x1: number;
  x2: number;
  x3: number;
};

const CloudBackground = ({ x1, x2, x3 }: Props) => {
  return (
    <>
      <motion.img
        src={cloud1}
        alt="cloud1"
        style={{
          position: 'absolute',
          top: 0,
          left: '20vw',
          width: 'auto',
          maxWidth: '100%',
          height: '100%',
          objectFit: 'contain',
          opacity: 0.7,
          pointerEvents: 'none',
          zIndex: 0
        }}
        animate={{ x: x1 }}
        transition={{ duration: 0.6 }}
      />
      <motion.img
        src={cloud2}
        alt="cloud2"
        style={{
          position: 'absolute',
          bottom: 0,
          left: '-5vw',
          width: 'auto',
          maxWidth: '100%',
          height: '80%',
          objectFit: 'contain',
          opacity: 0.5,
          pointerEvents: 'none',
          zIndex: 1
        }}
        animate={{ x: x2 }}
        transition={{ duration: 0.6 }}
      />
      <motion.img
        src={cloud3}
        alt="cloud3"
        style={{
          position: 'absolute',
          top: '5vh',
          left:  '100vw',
          width: 'auto',
          maxWidth: '100%',
          height: '60%',
          objectFit: 'contain',
          opacity: 0.9,
          pointerEvents: 'none',
          zIndex: 2
        }}
        animate={{ x: x3 }}
        transition={{ duration: 0.6 }}
      />
    </>
  );
};

export default CloudBackground;
