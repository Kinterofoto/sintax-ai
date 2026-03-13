import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { GlitchText } from '../../GlitchText';

interface SlideProps {
  isActive: boolean;
}

export const ModelSlide: React.FC<SlideProps> = ({ isActive }) => {
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
        <span className="font-mono text-[10px] text-white/20 tracking-[0.3em]">09 // THE_MODEL</span>
      </div>

      <div ref={(el: HTMLDivElement | null) => { elementsRef.current[1] = el; }} className="mt-6 opacity-0">
        <h2 className="text-[8vw] md:text-[5vw] font-pixel-square font-bold leading-[0.9] tracking-tight text-white uppercase">
          <GlitchText text="EVERYONE WINS" trigger={isActive} className="text-inherit font-inherit" />
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-10 md:mt-14">
        <div ref={(el: HTMLDivElement | null) => { elementsRef.current[2] = el; }} className="opacity-0">
          <div className="border border-white/10 p-6 h-full">
            <div className="font-mono text-[10px] text-white/30 tracking-widest mb-4">COMPONENTE_FIJO</div>
            <p className="font-mono text-xs text-white/50 leading-relaxed">
              Base retainer mensual. Frecuencia de entregas constante ligada a horas de trabajo.
            </p>
            <div className="mt-4 flex items-center gap-2">
              <span className="h-2 w-2 bg-white/20" />
              <span className="font-mono text-[10px] text-white/20">RECURRENTE</span>
            </div>
          </div>
        </div>

        <div ref={(el: HTMLDivElement | null) => { elementsRef.current[3] = el; }} className="opacity-0">
          <div className="border border-white/10 p-6 h-full">
            <div className="font-mono text-[10px] text-white/30 tracking-widest mb-4">COMPONENTE_VARIABLE</div>
            <p className="font-mono text-xs text-white/50 leading-relaxed">
              Consumo de tokens API, cloud, WhatsApp, cantidad de usuarios. Cada empresa es diferente.
            </p>
            <div className="mt-4 flex items-center gap-2">
              <span className="h-2 w-2 bg-white/20" />
              <span className="font-mono text-[10px] text-white/20">POR_CONSUMO</span>
            </div>
          </div>
        </div>

        <div ref={(el: HTMLDivElement | null) => { elementsRef.current[4] = el; }} className="opacity-0">
          <div className="border border-white/10 p-6 h-full">
            <div className="font-mono text-[10px] text-white/30 tracking-widest mb-4">IMPLEMENTACIÓN</div>
            <p className="font-mono text-xs text-white/50 leading-relaxed">
              Cubre el setup inicial, configuración, entrenamiento de agentes y onboarding.
            </p>
            <div className="mt-4 flex items-center gap-2">
              <span className="h-2 w-2 bg-white/20" />
              <span className="font-mono text-[10px] text-white/20">ONE_TIME</span>
            </div>
          </div>
        </div>
      </div>

      <div ref={(el: HTMLDivElement | null) => { elementsRef.current[5] = el; }} className="mt-10 opacity-0">
        <div className="border border-green-400/10 p-5 bg-green-400/[0.02]">
          <p className="font-mono text-xs md:text-sm text-white/60 leading-relaxed text-center">
            En 1 año, lo que tomaba <span className="text-white/20 line-through">1 mes</span> tomará <span className="text-green-400/60">1 minuto</span>.
            <br />
            El modelo no cambia — <span className="text-white/80">simplemente recibes MÁS.</span>
          </p>
        </div>
      </div>
    </div>
  );
};
