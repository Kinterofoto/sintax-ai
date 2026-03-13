import React from 'react';
import { motion } from 'framer-motion';

interface DeckSlideProps {
  children: React.ReactNode;
  direction: number;
}

const slideVariants = {
  enter: (direction: number) => ({
    x: direction >= 0 ? '80%' : '-80%',
    opacity: 0,
    scale: 0.95,
  }),
  center: {
    x: 0,
    opacity: 1,
    scale: 1,
  },
  exit: (direction: number) => ({
    x: direction >= 0 ? '-80%' : '80%',
    opacity: 0,
    scale: 0.95,
  }),
};

export const DeckSlide: React.FC<DeckSlideProps> = ({ children, direction }) => {
  return (
    <motion.div
      custom={direction}
      variants={slideVariants}
      initial="enter"
      animate="center"
      exit="exit"
      transition={{
        x: { type: 'tween', duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] },
        opacity: { duration: 0.3 },
        scale: { duration: 0.4 },
      }}
      className="h-full w-full flex items-center justify-center px-8 md:px-16 lg:px-24"
    >
      {children}
    </motion.div>
  );
};
