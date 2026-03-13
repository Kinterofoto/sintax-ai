import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { GlitchText } from '../../GlitchText';

interface SlideProps {
  isActive: boolean;
}

export const RhythmSlide: React.FC<SlideProps> = ({ isActive }) => {
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
    <div ref={containerRef} className="w-full max-w-4xl">
      <div ref={(el: HTMLDivElement | null) => { elementsRef.current[0] = el; }} className="opacity-0">
        <span className="font-mono text-[10px] text-white/20 tracking-[0.3em]">08 // EXECUTION</span>
      </div>

      <div ref={(el: HTMLDivElement | null) => { elementsRef.current[1] = el; }} className="mt-6 opacity-0">
        <h2 className="text-[10vw] md:text-[6vw] font-pixel-square font-bold leading-[0.85] tracking-tight text-white uppercase">
          <GlitchText text="THE RHYTHM" trigger={isActive} className="text-inherit font-inherit" />
        </h2>
      </div>

      <div ref={(el: HTMLDivElement | null) => { elementsRef.current[2] = el; }} className="mt-10 md:mt-14 opacity-0">
        <div className="relative pl-6 md:pl-8 border-l border-white/10">
          {/* Monthly */}
          <div className="mb-8">
            <div className="absolute -left-[5px] w-[10px] h-[10px] bg-white/80 mt-1" />
            <span className="font-mono text-[10px] text-white/40 tracking-widest block mb-2">CADA_MES</span>
            <p className="font-mono text-sm md:text-base text-white/60 leading-relaxed">
              Definimos el <span className="text-white/90">plan mensual</span> — objetivos claros, prioridades alineadas con tu negocio.
            </p>
          </div>

          {/* Weekly */}
          <div className="mb-8">
            <div className="absolute -left-[5px] w-[10px] h-[10px] bg-white/50 mt-1" />
            <span className="font-mono text-[10px] text-white/40 tracking-widest block mb-2">CADA_SEMANA</span>
            <p className="font-mono text-sm md:text-base text-white/60 leading-relaxed">
              Corte semanal: <span className="text-white/90">entregamos</span>, revisamos lo anterior, planeamos lo siguiente.
            </p>
          </div>

          {/* Always */}
          <div>
            <div className="absolute -left-[5px] w-[10px] h-[10px] bg-white/30 mt-1" />
            <span className="font-mono text-[10px] text-white/40 tracking-widest block mb-2">SIEMPRE</span>
            <p className="font-mono text-sm md:text-base text-white/60 leading-relaxed">
              Algo útil en tus manos <span className="text-white/90">cada 7 días</span>. No en 3 meses. No "casi listo".
            </p>
          </div>
        </div>
      </div>

      <div ref={(el: HTMLDivElement | null) => { elementsRef.current[3] = el; }} className="mt-10 opacity-0">
        <div className="flex items-center gap-4 font-mono text-xs text-white/30">
          <span className="text-white/10">▸</span>
          <span>PLAN</span>
          <span className="text-white/10">→</span>
          <span>BUILD</span>
          <span className="text-white/10">→</span>
          <span>DELIVER</span>
          <span className="text-white/10">→</span>
          <span>REVIEW</span>
          <span className="text-white/10">→</span>
          <span className="text-white/50">REPEAT</span>
        </div>
      </div>
    </div>
  );
};
