import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { GlitchText } from '../../GlitchText';

interface SlideProps {
  isActive: boolean;
}

export const RealityCheckSlide: React.FC<SlideProps> = ({ isActive }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const elementsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    if (!isActive) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        elementsRef.current.filter(Boolean),
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.7, stagger: 0.2, ease: 'power3.out', delay: 0.2 }
      );
    }, containerRef);
    return () => ctx.revert();
  }, [isActive]);

  return (
    <div ref={containerRef} className="w-full max-w-4xl">
      <div ref={(el: HTMLDivElement | null) => { elementsRef.current[0] = el; }} className="opacity-0">
        <span className="font-mono text-[10px] text-white/20 tracking-[0.3em]">02 // REALITY_CHECK</span>
      </div>

      <div ref={(el: HTMLDivElement | null) => { elementsRef.current[1] = el; }} className="mt-6 opacity-0">
        <h2 className="text-[8vw] md:text-[5vw] font-pixel-square font-bold leading-[0.9] tracking-tight text-white uppercase">
          <GlitchText text="TECH IS NO" trigger={isActive} className="text-inherit font-inherit" />
          <br />
          <GlitchText text="LONGER OPTIONAL" trigger={isActive} className="text-inherit font-inherit" />
        </h2>
      </div>

      <div ref={(el: HTMLDivElement | null) => { elementsRef.current[2] = el; }} className="mt-8 md:mt-12 max-w-2xl opacity-0">
        <p className="font-mono text-sm md:text-base text-white/50 leading-relaxed">
          Tener un equipo de tecnología ya no es opción.
          <span className="text-white/70"> Pero crearlo internamente es demasiado costoso y difícil.</span>
        </p>
      </div>

      <div ref={(el: HTMLDivElement | null) => { elementsRef.current[3] = el; }} className="mt-8 opacity-0">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="border border-red-400/10 p-4">
            <span className="font-mono text-[10px] text-red-400/40 tracking-widest block mb-2">EQUIPO_INTERNO</span>
            <span className="font-pixel-square text-2xl md:text-3xl text-white/60">$900K+</span>
            <span className="font-mono text-[10px] text-white/20 block mt-1">/AÑO (CTO + DEVS + QA + DEVOPS)</span>
          </div>
          <div className="border border-white/10 p-4">
            <span className="font-mono text-[10px] text-white/30 tracking-widest block mb-2">TIEMPO_RECLUTAMIENTO</span>
            <span className="font-pixel-square text-2xl md:text-3xl text-white/60">6-12</span>
            <span className="font-mono text-[10px] text-white/20 block mt-1">MESES PARA ARMAR EQUIPO</span>
          </div>
          <div className="border border-white/10 p-4">
            <span className="font-mono text-[10px] text-white/30 tracking-widest block mb-2">BRECHA_AI</span>
            <span className="font-pixel-square text-2xl md:text-3xl text-white/60">3×</span>
            <span className="font-mono text-[10px] text-white/20 block mt-1">MÁS ADOPCIÓN EN GRANDES vs PYMES</span>
          </div>
        </div>
      </div>

      <div ref={(el: HTMLDivElement | null) => { elementsRef.current[4] = el; }} className="mt-8 opacity-0">
        <div className="border-l border-green-400/20 pl-4 md:pl-6">
          <p className="font-mono text-xs md:text-sm text-white/40 leading-relaxed">
            Por eso lo que más hace sentido es <span className="text-green-400/60">tercerizarlo</span> —
            <span className="text-white/60"> ahora que es posible hacerlo bien.</span>
          </p>
        </div>
      </div>
    </div>
  );
};
