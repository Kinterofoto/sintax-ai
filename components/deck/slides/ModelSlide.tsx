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
    <div ref={containerRef} className="w-full max-w-5xl">
      <div ref={(el: HTMLDivElement | null) => { elementsRef.current[0] = el; }} className="opacity-0">
        <span className="font-mono text-[10px] text-white/20 tracking-[0.3em]">08 // THE_MODEL</span>
      </div>

      <div ref={(el: HTMLDivElement | null) => { elementsRef.current[1] = el; }} className="mt-6 opacity-0">
        <h2 className="text-[8vw] md:text-[5vw] font-pixel-square font-bold leading-[0.9] tracking-tight text-white uppercase">
          <GlitchText text="EVERYONE WINS" trigger={isActive} className="text-inherit font-inherit" />
        </h2>
      </div>

      {/* AI Evolution Data — token cost table */}
      <div ref={(el: HTMLDivElement | null) => { elementsRef.current[2] = el; }} className="mt-8 md:mt-10 opacity-0">
        <span className="font-mono text-[10px] text-white/20 tracking-widest block mb-4">COSTO POR MILLÓN DE TOKENS (INPUT) — RENDIMIENTO NIVEL GPT-4</span>
        <div className="space-y-1.5">
          {[
            { model: 'GPT-4', year: '2023', cost: 30, label: '$30.00', note: 'Lanzamiento' },
            { model: 'Claude 3.5 Sonnet', year: '2024', cost: 3, label: '$3.00', note: '' },
            { model: 'GPT-4o', year: '2024', cost: 2.5, label: '$2.50', note: '' },
            { model: 'DeepSeek V3', year: '2025', cost: 0.28, label: '$0.28', note: 'China' },
            { model: 'GPT-4o mini', year: '2024', cost: 0.15, label: '$0.15', note: '' },
            { model: 'Gemini Flash', year: '2025', cost: 0.15, label: '$0.15', note: 'Google' },
          ].map((item, i) => (
            <div key={i} className="flex items-center gap-3">
              <span className="font-mono text-[9px] text-white/30 w-32 md:w-36 shrink-0 truncate">{item.model}</span>
              <div className="flex-1 h-[6px] bg-white/5 overflow-hidden">
                <div
                  className="h-full bg-white/40"
                  style={{ width: `${Math.max((item.cost / 30) * 100, 1.5)}%` }}
                />
              </div>
              <span className="font-mono text-[9px] text-white/50 w-14 text-right shrink-0">{item.label}</span>
              {item.note && <span className="font-mono text-[8px] text-white/15 w-14 shrink-0">{item.note}</span>}
              {!item.note && <span className="w-14 shrink-0" />}
            </div>
          ))}
        </div>
        <div className="mt-4 flex items-center gap-2">
          <span className="font-mono text-[10px] text-white/30">RESULTADO:</span>
          <span className="font-mono text-[10px] text-white/15 line-through">$30</span>
          <span className="font-mono text-[10px] text-white/20">→</span>
          <span ref={costRef} className="font-mono text-sm text-white font-bold">$30</span>
          <span className="font-mono text-[10px] text-white/30">en 3 años</span>
          <span className="font-mono text-[10px] text-white/50 ml-2">— reducción 200×</span>
        </div>
      </div>

      {/* Benchmark evolution — dramatic jumps */}
      <div ref={(el: HTMLDivElement | null) => { elementsRef.current[3] = el; }} className="mt-8 opacity-0">
        <span className="font-mono text-[10px] text-white/20 tracking-widest block mb-3">CAPACIDAD_AI — SALTO EN 2 AÑOS</span>
        <div className="space-y-3">
          {[
            { bench: 'CÓDIGO REAL', sub: 'SWE-bench', before: 4, after: 81, label: '4% → 81%' },
            { bench: 'RAZONAMIENTO', sub: 'ARC-AGI', before: 2, after: 88, label: '2% → 88%' },
            { bench: 'CIENCIA PhD', sub: 'GPQA Diamond', before: 39, after: 94, label: '39% → 94%' },
          ].map((item, i) => (
            <div key={i}>
              <div className="flex items-center justify-between mb-1">
                <span className="font-mono text-[9px] text-white/40">{item.bench} <span className="text-white/15">({item.sub})</span></span>
                <span className="font-mono text-[9px] text-white/60">{item.label}</span>
              </div>
              <div className="flex-1 h-[6px] bg-white/5 overflow-hidden relative">
                <div className="absolute h-full bg-red-400/20" style={{ width: `${item.before}%` }} />
                <div className="absolute h-full bg-white/60" style={{ width: `${item.after}%` }} />
              </div>
            </div>
          ))}
        </div>
        <p className="font-mono text-[9px] text-white/15 mt-3">
          Expertos humanos en GPQA: 70% — los modelos ya los superan. Bar Exam: de percentil 10 a percentil 90.
        </p>
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
