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
    <div ref={containerRef} className="w-full max-w-5xl">
      <div ref={(el: HTMLDivElement | null) => { elementsRef.current[0] = el; }} className="opacity-0">
        <span className="font-mono text-[10px] text-white/20 tracking-[0.3em]">06 // OUR_APPROACH</span>
      </div>

      <div ref={(el: HTMLDivElement | null) => { elementsRef.current[1] = el; }} className="mt-6 opacity-0">
        <h2 className="text-[7vw] md:text-[4.5vw] font-pixel-square font-bold leading-[0.9] tracking-tight text-white uppercase">
          <GlitchText text="PROFITABILITY" trigger={isActive} className="text-inherit font-inherit" />
          <br />
          <GlitchText text="ALGORITHMS" trigger={isActive} className="text-inherit font-inherit" />
        </h2>
      </div>

      <div ref={(el: HTMLDivElement | null) => { elementsRef.current[2] = el; }} className="mt-8 md:mt-10 opacity-0">
        <p className="font-mono text-sm md:text-base text-white/50 leading-relaxed max-w-2xl">
          Hoy no tiene sentido construir tecnología solo con gente técnica.
          <span className="text-white/80"> Necesitas gente que entienda negocio, procesos, finanzas Y tecnología.</span>
        </p>
      </div>

      <div ref={(el: HTMLDivElement | null) => { elementsRef.current[3] = el; }} className="mt-8 opacity-0">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
          {[
            { label: 'NEGOCIO', desc: 'Estrategia y modelo', icon: '◆' },
            { label: 'PROCESOS', desc: 'Cómo realmente funciona', icon: '◆' },
            { label: 'FINANZAS', desc: 'ROI y rentabilidad', icon: '◆' },
            { label: 'TECNOLOGÍA', desc: 'AI agents + código', icon: '◆' },
          ].map((item, i) => (
            <div key={i} className="border border-white/10 p-4 text-center hover:border-white/20 transition-colors">
              <span className="text-green-400/30 text-lg block mb-2">{item.icon}</span>
              <span className="font-mono text-[10px] text-white/60 tracking-widest block">{item.label}</span>
              <span className="font-mono text-[9px] text-white/20 block mt-1">{item.desc}</span>
            </div>
          ))}
        </div>
      </div>

      <div ref={(el: HTMLDivElement | null) => { elementsRef.current[4] = el; }} className="mt-8 opacity-0">
        <div className="border-l border-green-400/20 pl-4 md:pl-6 space-y-3">
          <p className="font-mono text-xs md:text-sm text-white/40 leading-relaxed">
            No construimos tecnología por construir. Construimos
            <span className="text-white/80"> algoritmos de rentabilidad</span> —
            apps y agentes que
            <span className="text-green-400/60"> aumentan revenue</span> o
            <span className="text-green-400/60"> reducen costos</span>.
          </p>
          <p className="font-mono text-xs text-white/30 leading-relaxed">
            Esa combinación rara — generalistas que dominan las 4 dimensiones — es exactamente lo que somos.
            <span className="text-white/50"> Por eso tiene sentido construirlo con nosotros.</span>
          </p>
        </div>
      </div>

      <div ref={(el: HTMLDivElement | null) => { elementsRef.current[5] = el; }} className="mt-6 opacity-0">
        <div className="flex items-center gap-3 font-mono text-[10px] text-white/15">
          <span className="text-green-400/30">▸</span>
          <span>Empresas con vendors especializados logran <span className="text-white/40">$3.70 de valor por cada $1 invertido</span> en AI</span>
          <span className="text-white/10">—</span>
          <span>top performers: <span className="text-green-400/40">$10.30</span></span>
        </div>
      </div>
    </div>
  );
};
