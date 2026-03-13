import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { GlitchText } from '../../GlitchText';

interface SlideProps {
  isActive: boolean;
}

export const FailedSolutionsSlide: React.FC<SlideProps> = ({ isActive }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const elementsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    if (!isActive) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        elementsRef.current.filter(Boolean),
        { opacity: 0, y: 25 },
        { opacity: 1, y: 0, duration: 0.6, stagger: 0.15, ease: 'power3.out', delay: 0.2 }
      );
    }, containerRef);
    return () => ctx.revert();
  }, [isActive]);

  return (
    <div ref={containerRef} className="w-full max-w-5xl">
      <div ref={(el: HTMLDivElement | null) => { elementsRef.current[0] = el; }} className="opacity-0">
        <span className="font-mono text-[10px] text-white/20 tracking-[0.3em]">03 // FAILED_ALTERNATIVES</span>
      </div>

      <div ref={(el: HTMLDivElement | null) => { elementsRef.current[1] = el; }} className="mt-6 opacity-0">
        <h2 className="text-[7vw] md:text-[4.5vw] font-pixel-square font-bold leading-[0.9] tracking-tight text-white uppercase">
          <GlitchText text="BUILT FOR" trigger={isActive} className="text-inherit font-inherit" />
          <br />
          <GlitchText text="NO ONE" trigger={isActive} className="text-inherit font-inherit" />
        </h2>
      </div>

      <div ref={(el: HTMLDivElement | null) => { elementsRef.current[2] = el; }} className="mt-4 opacity-0">
        <p className="font-mono text-xs md:text-sm text-white/30 max-w-xl leading-relaxed">
          Tercerizar tecnología es la respuesta — pero hay que elegir bien cómo.
          <span className="text-white/50"> El 95% de implementaciones con AI fallan.</span>
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 mt-8 md:mt-10">
        {/* Column 1: Agents as a Service */}
        <div ref={(el: HTMLDivElement | null) => { elementsRef.current[3] = el; }} className="opacity-0">
          <div className="border border-white/10 p-6 md:p-8 relative">
            <span className="absolute -top-3 left-4 bg-[#050505] px-2 font-mono text-[10px] text-red-400/60 tracking-widest">
              AGENTS_AS_A_SERVICE
            </span>
            <ul className="space-y-3 font-mono text-xs md:text-sm text-white/40 leading-relaxed">
              <li className="flex items-start gap-2">
                <span className="text-red-400/40 mt-0.5">×</span>
                <span>Baratos al inicio, <span className="text-white/60">mucho más costosos a largo plazo</span></span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-red-400/40 mt-0.5">×</span>
                <span>Requieren mucho tiempo de estudio y configuración</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-red-400/40 mt-0.5">×</span>
                <span>Limitados a integraciones disponibles</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Column 2: Generic Apps */}
        <div ref={(el: HTMLDivElement | null) => { elementsRef.current[4] = el; }} className="opacity-0">
          <div className="border border-white/10 p-6 md:p-8 relative">
            <span className="absolute -top-3 left-4 bg-[#050505] px-2 font-mono text-[10px] text-red-400/60 tracking-widest">
              APPS_GENÉRICAS
            </span>
            <ul className="space-y-3 font-mono text-xs md:text-sm text-white/40 leading-relaxed">
              <li className="flex items-start gap-2">
                <span className="text-red-400/40 mt-0.5">×</span>
                <span>10,000 funciones. <span className="text-white/60">Usas 10.</span></span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-red-400/40 mt-0.5">×</span>
                <span>No piensan en tu tipo de usuario ni tus procesos reales</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-red-400/40 mt-0.5">×</span>
                <span>Difíciles de implementar, difíciles de adaptar</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div ref={(el: HTMLDivElement | null) => { elementsRef.current[5] = el; }} className="mt-8 opacity-0">
        <div className="flex items-center gap-4 font-mono text-[10px] text-white/20">
          <span className="text-white/30">STAT:</span>
          <span>Solo <span className="text-white/50">22%</span> de builds internos de AI tienen éxito</span>
          <span className="text-white/10">vs</span>
          <span><span className="text-green-400/50">67%</span> con vendors especializados</span>
        </div>
      </div>
    </div>
  );
};
