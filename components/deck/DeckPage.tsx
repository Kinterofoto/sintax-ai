import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { NoiseOverlay } from '../NoiseOverlay';
import { DeckSlide } from './DeckSlide';
import { DeckNavigation } from './DeckNavigation';
import { DeckProgress } from './DeckProgress';
import { TitleSlide } from './slides/TitleSlide';
import { RealityCheckSlide } from './slides/RealityCheckSlide';
import { FailedSolutionsSlide } from './slides/FailedSolutionsSlide';
import { CustomImperativeSlide } from './slides/CustomImperativeSlide';
import { MomentIsNowSlide } from './slides/MomentIsNowSlide';
import { WhyFailSlide } from './slides/WhyFailSlide';
import { OurApproachSlide } from './slides/OurApproachSlide';
import { PricingSlide } from './slides/PricingSlide';
import { ModelSlide } from './slides/ModelSlide';
import { CtaSlide } from './slides/CtaSlide';

const SLIDES = [
  TitleSlide,
  RealityCheckSlide,
  FailedSolutionsSlide,
  CustomImperativeSlide,
  MomentIsNowSlide,
  WhyFailSlide,
  OurApproachSlide,
  PricingSlide,
  ModelSlide,
  CtaSlide,
];

export const DeckPage: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [direction, setDirection] = useState(0);
  const navigate = useNavigate();
  const totalSlides = SLIDES.length;

  const goNext = useCallback(() => {
    setDirection(1);
    setCurrentSlide((s) => Math.min(s + 1, totalSlides - 1));
  }, [totalSlides]);

  const goPrev = useCallback(() => {
    setDirection(-1);
    setCurrentSlide((s) => Math.max(s - 1, 0));
  }, []);

  const goTo = useCallback((index: number) => {
    setDirection(index > currentSlide ? 1 : -1);
    setCurrentSlide(index);
  }, [currentSlide]);

  // Keyboard navigation
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' || e.key === ' ' || e.key === 'Enter') {
        e.preventDefault();
        goNext();
      }
      if (e.key === 'ArrowLeft') {
        e.preventDefault();
        goPrev();
      }
      if (e.key === 'Escape') {
        navigate('/');
      }
      // Number keys 1-9, 0=10
      const num = parseInt(e.key);
      if (!isNaN(num)) {
        const idx = num === 0 ? 9 : num - 1;
        if (idx < totalSlides) goTo(idx);
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [goNext, goPrev, goTo, navigate, totalSlides]);

  // Touch/swipe navigation
  useEffect(() => {
    let startX = 0;
    let startY = 0;

    const onTouchStart = (e: TouchEvent) => {
      startX = e.touches[0].clientX;
      startY = e.touches[0].clientY;
    };

    const onTouchEnd = (e: TouchEvent) => {
      const deltaX = e.changedTouches[0].clientX - startX;
      const deltaY = e.changedTouches[0].clientY - startY;
      if (Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) > 50) {
        if (deltaX < 0) goNext();
        else goPrev();
      }
    };

    window.addEventListener('touchstart', onTouchStart, { passive: true });
    window.addEventListener('touchend', onTouchEnd, { passive: true });
    return () => {
      window.removeEventListener('touchstart', onTouchStart);
      window.removeEventListener('touchend', onTouchEnd);
    };
  }, [goNext, goPrev]);

  // Show root
  useEffect(() => {
    const root = document.getElementById('root');
    if (root) root.style.opacity = '1';
  }, []);

  const CurrentSlideComponent = SLIDES[currentSlide];

  return (
    <div className="bg-[#050505] h-screen w-screen overflow-hidden text-white antialiased selection:bg-white selection:text-black relative" style={{ cursor: 'crosshair' }}>
      <NoiseOverlay />

      {/* CRT scanlines */}
      <div className="pointer-events-none fixed inset-0 z-20 opacity-[0.035]" style={{
        backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 1px, rgba(0,0,0,0.3) 1px, rgba(0,0,0,0.3) 2px)',
        backgroundSize: '100% 2px',
      }} />

      {/* Screen vignette */}
      <div className="pointer-events-none fixed inset-0 z-20" style={{
        background: 'radial-gradient(ellipse at center, transparent 50%, rgba(0,0,0,0.5) 100%)',
      }} />

      <DeckProgress current={currentSlide} total={totalSlides} />

      <div className="relative z-10 h-full w-full">
        <AnimatePresence mode="wait" custom={direction}>
          <DeckSlide key={currentSlide} direction={direction}>
            <CurrentSlideComponent isActive={true} />
          </DeckSlide>
        </AnimatePresence>
      </div>

      <DeckNavigation
        current={currentSlide}
        total={totalSlides}
        onNext={goNext}
        onPrev={goPrev}
      />

      {/* Click zones */}
      <div
        className="fixed left-0 top-0 w-1/3 h-full z-30 cursor-w-resize"
        onClick={goPrev}
        style={{ opacity: 0 }}
      />
      <div
        className="fixed right-0 top-0 w-1/3 h-full z-30 cursor-e-resize"
        onClick={goNext}
        style={{ opacity: 0 }}
      />
    </div>
  );
};
