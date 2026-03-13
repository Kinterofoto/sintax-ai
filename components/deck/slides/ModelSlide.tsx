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

      // Animated cost counter: $30 → $0.15
      if (costRef.current) {
        gsap.fromTo(
          { val: 30 },
          { val: 30 },
          {
            val: 0.15,
            duration: 2.5,
            delay: 1.2,
            ease: 'power2.inOut',
            onUpdate() {
              if (costRef.current) {
                const v = this.targets()[0].val;
                costRef.current.textContent = v >= 1 ? `$${Math.round(v)}` : `$${v.toFixed(2)}`;
              }
            },
          }
        );
      }
    }, containerRef);
    return () => ctx.revert();
  }, [isActive]);

  return (
    <div ref={containerRef} className="w-full max-w-4xl">
      <div ref={(el: HTMLDivElement | null) => { elementsRef.current[0] = el; }} className="opacity-0">
        <span className="font-mono text-[10px] text-white/20 tracking-[0.3em]">08 // THE_MODEL</span>
      </div>

      <div ref={(el: HTMLDivElement | null) => { elementsRef.current[1] = el; }} className="mt-6 opacity-0">
        <h2 className="text-[8vw] md:text-[5vw] font-pixel-square font-bold leading-[0.9] tracking-tight text-white uppercase">
          <GlitchText text="EVERYONE WINS" trigger={isActive} className="text-inherit font-inherit" />
        </h2>
      </div>

      {/* Cost punchline — simple, not a table */}
      <div ref={(el: HTMLDivElement | null) => { elementsRef.current[2] = el; }} className="mt-10 md:mt-14 opacity-0">
        <div className="flex items-baseline gap-3">
          <span className="font-mono text-[10px] text-white/30">COSTO AI (GPT-4 nivel):</span>
          <span className="font-mono text-sm text-white/20 line-through">$30</span>
          <span className="font-mono text-white/20">→</span>
          <span ref={costRef} className="font-pixel-square text-4xl md:text-5xl text-white font-bold">$30</span>
          <span className="font-mono text-[10px] text-white/30">/M tokens</span>
        </div>
        <p className="font-mono text-xs text-white/30 mt-2">
          Reducción <span className="text-white/60">200×</span> en 3 años — incluyendo modelos chinos como DeepSeek ($0.28)
        </p>
      </div>

      {/* Benchmark evolution — stacked bars with clear contrast */}
      <div ref={(el: HTMLDivElement | null) => { elementsRef.current[3] = el; }} className="mt-10 opacity-0">
        <span className="font-mono text-[10px] text-white/20 tracking-widest block mb-4">CAPACIDAD_AI — SALTO EN 2 AÑOS</span>
        <div className="space-y-4">
          {[
            { bench: 'CÓDIGO REAL', sub: 'SWE-bench', before: 4, after: 81 },
            { bench: 'RAZONAMIENTO', sub: 'ARC-AGI', before: 2, after: 88 },
            { bench: 'CIENCIA PhD', sub: 'GPQA Diamond', before: 39, after: 94 },
          ].map((item, i) => (
            <div key={i}>
              <div className="flex items-center justify-between mb-1.5">
                <span className="font-mono text-[9px] text-white/40">{item.bench} <span className="text-white/15">({item.sub})</span></span>
              </div>
              <div className="space-y-1">
                <div className="flex items-center gap-3">
                  <span className="font-mono text-[8px] text-white/20 w-12 shrink-0">2023</span>
                  <div className="flex-1 h-[6px] bg-white/[0.03]">
                    <div className="h-full bg-red-400/50" style={{ width: `${item.before}%` }} />
                  </div>
                  <span className="font-mono text-[9px] text-white/25 w-8 text-right">{item.before}%</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="font-mono text-[8px] text-white/40 w-12 shrink-0">2025</span>
                  <div className="flex-1 h-[6px] bg-white/[0.03]">
                    <div className="h-full bg-white/80" style={{ width: `${item.after}%` }} />
                  </div>
                  <span className="font-mono text-[9px] text-white/60 w-8 text-right">{item.after}%</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* The punchline */}
      <div ref={(el: HTMLDivElement | null) => { elementsRef.current[4] = el; }} className="mt-10 opacity-0">
        <p className="font-mono text-xs md:text-sm text-white/50 leading-relaxed">
          Los modelos mejoran exponencialmente — <span className="text-white/80">con el mismo precio, recibes MÁS.</span>
        </p>
      </div>
    </div>
  );
};
