import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { GlitchText } from '../../GlitchText';

interface SlideProps {
  isActive: boolean;
}

export const CtaSlide: React.FC<SlideProps> = ({ isActive }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const elementsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    if (!isActive) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        elementsRef.current.filter(Boolean),
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8, stagger: 0.2, ease: 'power3.out', delay: 0.2 }
      );
    }, containerRef);
    return () => ctx.revert();
  }, [isActive]);

  return (
    <div ref={containerRef} className="w-full max-w-4xl text-center">
      <div ref={(el: HTMLDivElement | null) => { elementsRef.current[0] = el; }} className="opacity-0">
        <span className="font-mono text-[10px] text-white/20 tracking-[0.3em]">10 // INITIATE</span>
      </div>

      <div ref={(el: HTMLDivElement | null) => { elementsRef.current[1] = el; }} className="mt-8 md:mt-12 opacity-0">
        <h2 className="text-[14vw] md:text-[10vw] font-pixel-square font-bold leading-[0.85] tracking-tight text-white uppercase">
          <GlitchText text="MOVE" trigger={isActive} className="text-inherit font-inherit" />
        </h2>
        <h2 className="text-[14vw] md:text-[10vw] font-pixel-grid font-bold leading-[0.85] tracking-tight text-white/40 uppercase mt-2">
          <GlitchText text="FIRST." trigger={isActive} className="text-inherit font-inherit" />
        </h2>
      </div>

      <div ref={(el: HTMLDivElement | null) => { elementsRef.current[2] = el; }} className="mt-6 opacity-0">
        <p className="font-mono text-sm md:text-base text-white/30">
          O otros lo harán — y te sacarán del mercado.
        </p>
      </div>

      <div ref={(el: HTMLDivElement | null) => { elementsRef.current[3] = el; }} className="mt-10 md:mt-14 opacity-0">
        <a
          href="https://wa.me/573115259295?text=Quiero%20saber%20m%C3%A1s%20sobre%20Sintax%20AI"
          target="_blank"
          rel="noopener noreferrer"
          className="group inline-flex items-center justify-center gap-3 text-sm md:text-base text-white hover:text-white transition-all duration-300 border border-white/20 hover:border-white/60 hover:bg-white/[0.06] px-8 py-4 backdrop-blur-sm font-mono tracking-[0.2em] uppercase"
        >
          <span className="text-green-400/80 group-hover:text-green-400 transition-colors text-sm">▸</span>
          <span className="font-bold">INITIATE_HANDSHAKE</span>
          <span className="text-white/30 group-hover:text-white/60 transition-colors">↵</span>
        </a>
      </div>

      <div ref={(el: HTMLDivElement | null) => { elementsRef.current[4] = el; }} className="mt-12 opacity-0">
        <div className="flex items-center justify-center gap-3">
          <span className="h-[1px] w-12 bg-white/10" />
          <span className="font-mono text-[10px] text-white/15 tracking-[0.5em]">SINTAX.AI</span>
          <span className="h-[1px] w-12 bg-white/10" />
        </div>
        <p className="font-mono text-[9px] text-white/10 mt-3 tracking-widest">
          THE SIGNAL IN THE NOISE
        </p>
      </div>
    </div>
  );
};
