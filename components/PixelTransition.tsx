import React, { useEffect, useRef, useMemo } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const COLS = 12;
const ROWS = 8;

export const PixelTransition: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const pixelsRef = useRef<(HTMLDivElement | null)[]>([]);

  // Pre-compute a shuffled order for staggered reveal
  const order = useMemo(() => {
    const indices = Array.from({ length: COLS * ROWS }, (_, i) => i);
    // Weighted shuffle: bottom pixels reveal earlier (closer to white section)
    indices.sort(() => Math.random() - 0.5);
    // Bias: pixels in lower rows get earlier positions
    indices.sort((a, b) => {
      const rowA = Math.floor(a / COLS);
      const rowB = Math.floor(b / COLS);
      return (rowB - rowA) * 0.6 + (Math.random() - 0.5) * ROWS;
    });
    return indices;
  }, []);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top 80%',
          end: 'bottom 30%',
          scrub: 0.8,
        },
      });

      // Animate each pixel from black to white in shuffled order
      order.forEach((pixelIdx, sequencePos) => {
        const el = pixelsRef.current[pixelIdx];
        if (!el) return;
        const progress = sequencePos / (COLS * ROWS);
        tl.to(el, {
          backgroundColor: '#F0F0F0',
          duration: 0.15,
          ease: 'steps(1)',
        }, progress * 0.85);
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [order]);

  return (
    <section
      ref={sectionRef}
      className="relative w-full overflow-hidden"
      style={{ height: '80vh' }}
    >
      <div
        className="absolute inset-0 grid"
        style={{
          gridTemplateColumns: `repeat(${COLS}, 1fr)`,
          gridTemplateRows: `repeat(${ROWS}, 1fr)`,
        }}
      >
        {Array.from({ length: COLS * ROWS }, (_, i) => (
          <div
            key={i}
            ref={(el) => { pixelsRef.current[i] = el; }}
            style={{ backgroundColor: '#050505' }}
          />
        ))}
      </div>
    </section>
  );
};
