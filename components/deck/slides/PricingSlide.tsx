import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { GlitchText } from '../../GlitchText';

interface SlideProps {
  isActive: boolean;
}

export const PricingSlide: React.FC<SlideProps> = ({ isActive }) => {
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
        <span className="font-mono text-[10px] text-white/20 tracking-[0.3em]">07 // PRICING_PROTOCOL</span>
      </div>

      <div ref={(el: HTMLDivElement | null) => { elementsRef.current[1] = el; }} className="mt-6 opacity-0">
        <h2 className="text-[7vw] md:text-[4.5vw] font-pixel-square font-bold leading-[0.9] tracking-tight text-white uppercase">
          <GlitchText text="TRANSPARENT" trigger={isActive} className="text-inherit font-inherit" />
          <br />
          <GlitchText text="PRICING" trigger={isActive} className="text-inherit font-inherit" />
        </h2>
      </div>

      <div ref={(el: HTMLDivElement | null) => { elementsRef.current[2] = el; }} className="mt-8 md:mt-12 opacity-0">
        <p className="font-mono text-sm md:text-base text-white/50 leading-relaxed max-w-2xl">
          No cobramos por complejidad ni por feature.
          <span className="text-white/70"> Cobramos por frecuencia de entregas ligada a horas.</span>
        </p>
      </div>

      <div ref={(el: HTMLDivElement | null) => { elementsRef.current[3] = el; }} className="mt-8 opacity-0">
        <div className="space-y-3">
          {/* Pricing row: why not by feature */}
          <div className="border border-white/10 p-4 flex items-center gap-4">
            <span className="font-mono text-[10px] text-red-400/40 tracking-widest w-32 shrink-0">POR_FEATURE</span>
            <span className="h-[1px] flex-1 bg-white/5" />
            <span className="font-mono text-xs text-white/30">No tiene sentido</span>
            <span className="text-red-400/40">✕</span>
          </div>

          <div className="border border-white/10 p-4 flex items-center gap-4">
            <span className="font-mono text-[10px] text-red-400/40 tracking-widest w-32 shrink-0">POR_COMPLEJIDAD</span>
            <span className="h-[1px] flex-1 bg-white/5" />
            <span className="font-mono text-xs text-white/30">Obsoleto</span>
            <span className="text-red-400/40">✕</span>
          </div>

          <div className="border border-green-400/20 p-4 flex items-center gap-4 bg-green-400/[0.02]">
            <span className="font-mono text-[10px] text-green-400/60 tracking-widest w-32 shrink-0">POR_ENTREGAS</span>
            <span className="h-[1px] flex-1 bg-white/5" />
            <span className="font-mono text-xs text-white/60">Transparente + escalable</span>
            <span className="text-green-400/60">▸</span>
          </div>
        </div>
      </div>

      <div ref={(el: HTMLDivElement | null) => { elementsRef.current[4] = el; }} className="mt-8 opacity-0">
        <div className="flex items-baseline gap-4">
          <span className="font-pixel-square text-3xl md:text-4xl text-white font-bold">$8M</span>
          <span className="font-mono text-xs text-white/30">/MES</span>
          <span className="font-mono text-[10px] text-white/15">COP</span>
        </div>
        <p className="font-mono text-[10px] text-white/25 mt-2">
          Entregas útiles cada semana. Sin sorpresas.
        </p>
      </div>
    </div>
  );
};
