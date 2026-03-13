import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { GlitchText } from '../../GlitchText';

interface SlideProps {
  isActive: boolean;
}

export const TitleSlide: React.FC<SlideProps> = ({ isActive }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const lineRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    if (!isActive) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        lineRefs.current.filter(Boolean),
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.6, stagger: 0.15, ease: 'power3.out', delay: 0.3 }
      );
    }, containerRef);
    return () => ctx.revert();
  }, [isActive]);

  return (
    <div ref={containerRef} className="w-full max-w-5xl text-center">
      <div ref={(el: HTMLDivElement | null) => { lineRefs.current[0] = el; }} className="opacity-0">
        <span className="font-mono text-[10px] md:text-xs text-white/20 tracking-[0.5em] uppercase">
          SINTAX.AI // CONFIDENTIAL BRIEFING
        </span>
      </div>

      <div ref={(el: HTMLDivElement | null) => { lineRefs.current[1] = el; }} className="mt-8 md:mt-12 opacity-0">
        <span className="block text-[14vw] md:text-[10vw] font-pixel-square font-bold leading-[0.85] tracking-[-0.04em] text-white uppercase">
          {isActive ? <GlitchText text="THE" className="text-inherit font-inherit" trigger={isActive} /> : 'THE'}
        </span>
      </div>

      <div ref={(el: HTMLDivElement | null) => { lineRefs.current[2] = el; }} className="flex items-center justify-center gap-3 md:gap-5 my-2 md:my-3 opacity-0">
        <span className="h-[1px] w-8 md:w-20 bg-white/15" />
        <span className="font-mono text-[10px] md:text-xs text-white/40 tracking-[0.5em] uppercase">SIGNAL IN THE</span>
        <span className="h-[1px] w-8 md:w-20 bg-white/15" />
      </div>

      <div ref={(el: HTMLDivElement | null) => { lineRefs.current[3] = el; }} className="opacity-0">
        <span className="block text-[14vw] md:text-[10vw] font-pixel-grid font-bold leading-[0.85] tracking-[-0.04em] text-white uppercase">
          {isActive ? <GlitchText text="NOISE" className="text-inherit font-inherit" trigger={isActive} /> : 'NOISE'}
        </span>
      </div>

      <div ref={(el: HTMLDivElement | null) => { lineRefs.current[4] = el; }} className="mt-10 md:mt-16 opacity-0">
        <p className="font-mono text-[10px] md:text-xs text-white/20 leading-relaxed">
          <span className="text-white/30">// </span>Tecnología a la medida que realmente automatiza<br />
          <span className="text-white/30">// </span>y te permite escalar tu negocio.
        </p>
      </div>
    </div>
  );
};
