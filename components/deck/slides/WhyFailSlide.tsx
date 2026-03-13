import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { GlitchText } from '../../GlitchText';

interface SlideProps {
  isActive: boolean;
}

export const WhyFailSlide: React.FC<SlideProps> = ({ isActive }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const elementsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    if (!isActive) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        elementsRef.current.filter(Boolean),
        { opacity: 0, y: 25 },
        { opacity: 1, y: 0, duration: 0.7, stagger: 0.15, ease: 'power3.out', delay: 0.2 }
      );
    }, containerRef);
    return () => ctx.revert();
  }, [isActive]);

  return (
    <div ref={containerRef} className="w-full max-w-5xl">
      <div ref={(el: HTMLDivElement | null) => { elementsRef.current[0] = el; }} className="opacity-0">
        <span className="font-mono text-[10px] text-white/20 tracking-[0.3em]">06 // FAILURE_ANALYSIS</span>
      </div>

      <div ref={(el: HTMLDivElement | null) => { elementsRef.current[1] = el; }} className="mt-6 opacity-0">
        <h2 className="text-[12vw] md:text-[7vw] font-pixel-square font-bold leading-[0.85] tracking-tight text-white uppercase">
          <GlitchText text="95%" trigger={isActive} className="text-inherit font-inherit" />
          <span className="text-[6vw] md:text-[3.5vw] font-pixel-grid text-white/40 block mt-2">FAIL</span>
        </h2>
      </div>

      <div ref={(el: HTMLDivElement | null) => { elementsRef.current[2] = el; }} className="mt-8 md:mt-12 opacity-0">
        <p className="font-mono text-sm md:text-base text-white/50 leading-relaxed max-w-xl">
          El 95% de las implementaciones con IA mueren.
          <span className="text-white/70"> ¿Por qué?</span>
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
        {/* The wrong way */}
        <div ref={(el: HTMLDivElement | null) => { elementsRef.current[3] = el; }} className="opacity-0">
          <div className="border border-red-400/10 p-5 space-y-2">
            <span className="font-mono text-[10px] text-red-400/40 tracking-widest">SIN_CONTROL</span>
            <div className="font-mono text-xs text-white/30 space-y-1.5 mt-3">
              <div className="flex items-center gap-2">
                <span className="text-red-400/50">✕</span>
                <span>Probabilístico sin determinismo</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-red-400/50">✕</span>
                <span>Sin tracing de decisiones</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-red-400/50">✕</span>
                <span>Sin monitoring continuo</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-red-400/50">✕</span>
                <span>Sin ciclos de mejora</span>
              </div>
            </div>
          </div>
        </div>

        {/* The right way */}
        <div ref={(el: HTMLDivElement | null) => { elementsRef.current[4] = el; }} className="opacity-0">
          <div className="border border-green-400/10 p-5 space-y-2">
            <span className="font-mono text-[10px] text-green-400/40 tracking-widest">CON_CONTROL</span>
            <div className="font-mono text-xs text-white/50 space-y-1.5 mt-3">
              <div className="flex items-center gap-2">
                <span className="text-green-400/50">▸</span>
                <span>Determinismo + probabilismo balanceado</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-green-400/50">▸</span>
                <span>Tracing de cada decisión del agente</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-green-400/50">▸</span>
                <span>Monitoring en tiempo real</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-green-400/50">▸</span>
                <span>Improving constante con data real</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
