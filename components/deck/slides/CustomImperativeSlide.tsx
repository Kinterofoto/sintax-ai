import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { GlitchText } from '../../GlitchText';

interface SlideProps {
  isActive: boolean;
}

export const CustomImperativeSlide: React.FC<SlideProps> = ({ isActive }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const elementsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    if (!isActive) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        elementsRef.current.filter(Boolean),
        { opacity: 0, y: 25 },
        { opacity: 1, y: 0, duration: 0.7, stagger: 0.2, ease: 'power3.out', delay: 0.2 }
      );
    }, containerRef);
    return () => ctx.revert();
  }, [isActive]);

  return (
    <div ref={containerRef} className="w-full max-w-4xl">
      <div ref={(el: HTMLDivElement | null) => { elementsRef.current[0] = el; }} className="opacity-0">
        <span className="font-mono text-[10px] text-white/20 tracking-[0.3em]">04 // CUSTOM_IMPERATIVE</span>
      </div>

      <div ref={(el: HTMLDivElement | null) => { elementsRef.current[1] = el; }} className="mt-6 opacity-0">
        <h2 className="text-[8vw] md:text-[5vw] font-pixel-square font-bold leading-[0.9] tracking-tight text-white uppercase">
          <GlitchText text="YOU DESERVE" trigger={isActive} className="text-inherit font-inherit" />
          <br />
          <GlitchText text="YOUR OWN" trigger={isActive} className="text-inherit font-inherit" />
        </h2>
      </div>

      <div ref={(el: HTMLDivElement | null) => { elementsRef.current[2] = el; }} className="mt-10 md:mt-14 opacity-0">
        <div className="space-y-6">
          <div className="flex items-start gap-4">
            <span className="text-green-400/60 font-mono text-sm mt-0.5">▸</span>
            <p className="font-mono text-sm md:text-base text-white/60 leading-relaxed">
              Agentes entrenados con <span className="text-white/90">TU información</span> y <span className="text-white/90">TUS instrucciones</span>
            </p>
          </div>
          <div className="flex items-start gap-4">
            <span className="text-green-400/60 font-mono text-sm mt-0.5">▸</span>
            <p className="font-mono text-sm md:text-base text-white/60 leading-relaxed">
              Conectados a <span className="text-white/90">TUS sistemas</span>, no limitados por integraciones genéricas
            </p>
          </div>
          <div className="flex items-start gap-4">
            <span className="text-green-400/60 font-mono text-sm mt-0.5">▸</span>
            <p className="font-mono text-sm md:text-base text-white/60 leading-relaxed">
              Apps que se ajustan a <span className="text-white/90">tus procesos reales</span> — como realmente funcionan
            </p>
          </div>
        </div>
      </div>

      <div ref={(el: HTMLDivElement | null) => { elementsRef.current[3] = el; }} className="mt-10 opacity-0">
        <div className="border border-white/10 p-6 inline-block">
          <p className="font-pixel-triangle text-lg md:text-2xl text-white/80 tracking-wide">
            "CUSTOM AGENTS FOR CUSTOM CHAOS"
          </p>
        </div>
      </div>
    </div>
  );
};
