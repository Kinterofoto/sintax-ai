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
        <span className="font-mono text-[10px] text-white/20 tracking-[0.3em]">03 // FAILED_SOLUTIONS</span>
      </div>

      <div ref={(el: HTMLDivElement | null) => { elementsRef.current[1] = el; }} className="mt-6 opacity-0">
        <h2 className="text-[7vw] md:text-[4.5vw] font-pixel-square font-bold leading-[0.9] tracking-tight text-white uppercase">
          <GlitchText text="THE OUTSOURCING TRAP" trigger={isActive} className="text-inherit font-inherit" />
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 mt-10 md:mt-14">
        {/* Column 1: Agents as a Service */}
        <div ref={(el: HTMLDivElement | null) => { elementsRef.current[2] = el; }} className="opacity-0">
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
                <span>Difíciles de encontrar, requieren mucho tiempo y estudio</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-red-400/40 mt-0.5">×</span>
                <span>Limitados a las integraciones que tengan disponibles</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Column 2: Generic Apps */}
        <div ref={(el: HTMLDivElement | null) => { elementsRef.current[3] = el; }} className="opacity-0">
          <div className="border border-white/10 p-6 md:p-8 relative">
            <span className="absolute -top-3 left-4 bg-[#050505] px-2 font-mono text-[10px] text-red-400/60 tracking-widest">
              GENERIC_APPS
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

      <div ref={(el: HTMLDivElement | null) => { elementsRef.current[4] = el; }} className="mt-8 opacity-0">
        <p className="font-mono text-xs text-white/20 leading-relaxed">
          <span className="text-white/30">// </span>Es como contratar un celador — hace lo mismo sin importar la empresa.
          <br />
          <span className="text-white/30">// </span>Pero para tus procesos core, tercerizar siempre será difícil.
        </p>
      </div>
    </div>
  );
};
