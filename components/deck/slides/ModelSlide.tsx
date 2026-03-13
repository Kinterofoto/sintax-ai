import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { GlitchText } from '../../GlitchText';

interface SlideProps {
  isActive: boolean;
}

export const ModelSlide: React.FC<SlideProps> = ({ isActive }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const elementsRef = useRef<(HTMLDivElement | null)[]>([]);
  const costRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (!isActive) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        elementsRef.current.filter(Boolean),
        { opacity: 0, y: 25 },
        { opacity: 1, y: 0, duration: 0.7, stagger: 0.18, ease: 'power3.out', delay: 0.2 }
      );

      // Animated cost counter: $30 → $1
      if (costRef.current) {
        gsap.fromTo(
          { val: 30 },
          { val: 30 },
          {
            val: 1,
            duration: 2.5,
            delay: 1.2,
            ease: 'power2.inOut',
            onUpdate() {
              if (costRef.current) {
                const v = Math.round(this.targets()[0].val);
                costRef.current.textContent = `$${v}`;
              }
            },
          }
        );
      }
    }, containerRef);
    return () => ctx.revert();
  }, [isActive]);

  return (
    <div ref={containerRef} className="w-full max-w-5xl">
      <div ref={(el: HTMLDivElement | null) => { elementsRef.current[0] = el; }} className="opacity-0">
        <span className="font-mono text-[10px] text-white/20 tracking-[0.3em]">08 // THE_MODEL</span>
      </div>

      <div ref={(el: HTMLDivElement | null) => { elementsRef.current[1] = el; }} className="mt-6 opacity-0">
        <h2 className="text-[8vw] md:text-[5vw] font-pixel-square font-bold leading-[0.9] tracking-tight text-white uppercase">
          <GlitchText text="EVERYONE WINS" trigger={isActive} className="text-inherit font-inherit" />
        </h2>
      </div>

      {/* AI Evolution Data */}
      <div ref={(el: HTMLDivElement | null) => { elementsRef.current[2] = el; }} className="mt-8 md:mt-10 opacity-0">
        <span className="font-mono text-[10px] text-white/20 tracking-widest block mb-4">EVOLUCIÓN_AI — COSTO POR MILLÓN DE TOKENS</span>
        <div className="flex items-end gap-2 md:gap-3 h-32 md:h-40">
          {[
            { year: '2023', cost: '$30', height: '100%', color: 'bg-white/20' },
            { year: '2024', cost: '$4', height: '13%', color: 'bg-white/30' },
            { year: '2024.5', cost: '$0.70', height: '2.3%', color: 'bg-white/40' },
            { year: '2025', cost: '<$1', height: '3%', color: 'bg-green-400/40' },
          ].map((item, i) => (
            <div key={i} className="flex-1 flex flex-col items-center justify-end h-full">
              <span className="font-mono text-[9px] text-white/40 mb-1">{item.cost}</span>
              <div className={`w-full ${item.color} transition-all duration-500`} style={{ height: item.height, minHeight: '4px' }} />
              <span className="font-mono text-[8px] text-white/20 mt-1">{item.year}</span>
            </div>
          ))}
        </div>
        <div className="mt-3 flex items-center gap-2">
          <span className="font-mono text-[10px] text-white/30">COSTO GPT-4 NIVEL:</span>
          <span className="font-mono text-[10px] text-white/15 line-through">$30</span>
          <span className="font-mono text-[10px] text-white/20">→</span>
          <span ref={costRef} className="font-mono text-sm text-green-400/60 font-bold">$30</span>
          <span className="font-mono text-[10px] text-white/20">en menos de 3 años</span>
          <span className="font-mono text-[9px] text-white/10 ml-2">— reducción 30×</span>
        </div>
      </div>

      {/* Benchmark evolution */}
      <div ref={(el: HTMLDivElement | null) => { elementsRef.current[3] = el; }} className="mt-8 opacity-0">
        <span className="font-mono text-[10px] text-white/20 tracking-widest block mb-3">BENCHMARKS_MMLU — SUPERANDO HUMANOS</span>
        <div className="space-y-2">
          {[
            { model: 'GPT-3.5', score: 70, year: '2023' },
            { model: 'GPT-4', score: 86, year: '2023' },
            { model: 'Claude 3.5', score: 88, year: '2024' },
            { model: 'Frontier 2025', score: 93, year: '2025' },
          ].map((item, i) => (
            <div key={i} className="flex items-center gap-3">
              <span className="font-mono text-[9px] text-white/30 w-24 shrink-0">{item.model}</span>
              <div className="flex-1 h-[3px] bg-white/5 overflow-hidden">
                <div
                  className={`h-full ${item.score >= 89 ? 'bg-green-400/50' : 'bg-white/25'} transition-all duration-1000`}
                  style={{ width: `${item.score}%` }}
                />
              </div>
              <span className="font-mono text-[9px] text-white/30 w-8">{item.score}%</span>
            </div>
          ))}
          <div className="flex items-center gap-3">
            <span className="font-mono text-[9px] text-white/40 w-24 shrink-0">HUMANO</span>
            <div className="flex-1 h-[1px] border-t border-dashed border-white/15" />
            <span className="font-mono text-[9px] text-white/40 w-8">89.8%</span>
          </div>
        </div>
      </div>

      {/* The punchline */}
      <div ref={(el: HTMLDivElement | null) => { elementsRef.current[4] = el; }} className="mt-8 opacity-0">
        <div className="border border-green-400/10 p-5 bg-green-400/[0.02]">
          <p className="font-mono text-xs md:text-sm text-white/60 leading-relaxed text-center">
            En 1 año, lo que tomaba <span className="text-white/20 line-through">1 mes</span> tomará <span className="text-green-400/60">1 minuto</span>.
            <br />
            Los modelos mejoran exponencialmente — <span className="text-white/80">con el mismo precio, recibes MÁS.</span>
          </p>
        </div>
      </div>
    </div>
  );
};
