import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { GlitchText } from '../../GlitchText';

interface SlideProps {
  isActive: boolean;
}

export const OurApproachSlide: React.FC<SlideProps> = ({ isActive }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const elementsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    if (!isActive) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        elementsRef.current.filter(Boolean),
        { opacity: 0, y: 25 },
        { opacity: 1, y: 0, duration: 0.7, stagger: 0.18, ease: 'power3.out', delay: 0.2 }
      );
    }, containerRef);
    return () => ctx.revert();
  }, [isActive]);

  return (
    <div ref={containerRef} className="w-full max-w-4xl">
      <div ref={(el: HTMLDivElement | null) => { elementsRef.current[0] = el; }} className="opacity-0">
        <span className="font-mono text-[10px] text-white/20 tracking-[0.3em]">07 // OUR_APPROACH</span>
      </div>

      <div ref={(el: HTMLDivElement | null) => { elementsRef.current[1] = el; }} className="mt-6 opacity-0">
        <h2 className="text-[7vw] md:text-[4.5vw] font-pixel-square font-bold leading-[0.9] tracking-tight text-white uppercase">
          <GlitchText text="PROFITABILITY" trigger={isActive} className="text-inherit font-inherit" />
          <br />
          <GlitchText text="ALGORITHMS" trigger={isActive} className="text-inherit font-inherit" />
        </h2>
      </div>

      <div ref={(el: HTMLDivElement | null) => { elementsRef.current[2] = el; }} className="mt-10 md:mt-12 opacity-0">
        <p className="font-mono text-sm md:text-base text-white/50 leading-relaxed max-w-2xl">
          No construimos tecnología por construir. Construimos
          <span className="text-white/80"> algoritmos de rentabilidad</span> que
          <span className="text-green-400/60"> aumentan revenue</span> o
          <span className="text-green-400/60"> reducen costos</span>.
        </p>
      </div>

      <div ref={(el: HTMLDivElement | null) => { elementsRef.current[3] = el; }} className="mt-10 opacity-0">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: 'NEGOCIO', icon: '◆' },
            { label: 'PROCESOS', icon: '◆' },
            { label: 'FINANZAS', icon: '◆' },
            { label: 'TECNOLOGÍA', icon: '◆' },
          ].map((item, i) => (
            <div key={i} className="border border-white/10 p-4 text-center">
              <span className="text-white/20 text-lg block mb-2">{item.icon}</span>
              <span className="font-mono text-[10px] text-white/50 tracking-widest">{item.label}</span>
            </div>
          ))}
        </div>
      </div>

      <div ref={(el: HTMLDivElement | null) => { elementsRef.current[4] = el; }} className="mt-8 opacity-0">
        <div className="flex items-center gap-3">
          <span className="h-[1px] flex-1 bg-white/10" />
          <span className="font-mono text-[10px] text-white/30 tracking-widest">= TECH DESDE LA ESTRATEGIA</span>
          <span className="h-[1px] flex-1 bg-white/10" />
        </div>
      </div>

      <div ref={(el: HTMLDivElement | null) => { elementsRef.current[5] = el; }} className="mt-6 opacity-0">
        <p className="font-mono text-xs text-white/20 leading-relaxed">
          <span className="text-white/30">// </span>En esta época ganan los generalistas.
          <br />
          <span className="text-white/30">// </span>Negocio + procesos + finanzas + tech = la combinación rara.
        </p>
      </div>
    </div>
  );
};
