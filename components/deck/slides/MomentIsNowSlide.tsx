import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { GlitchText } from '../../GlitchText';

interface SlideProps {
  isActive: boolean;
}

export const MomentIsNowSlide: React.FC<SlideProps> = ({ isActive }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const elementsRef = useRef<(HTMLDivElement | null)[]>([]);
  const counterRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (!isActive) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        elementsRef.current.filter(Boolean),
        { opacity: 0, y: 25 },
        { opacity: 1, y: 0, duration: 0.7, stagger: 0.2, ease: 'power3.out', delay: 0.2 }
      );

      // Animated counter: 30 days → 1 day
      if (counterRef.current) {
        gsap.fromTo(
          { val: 30 },
          { val: 30 },
          {
            val: 1,
            duration: 2,
            delay: 1,
            ease: 'power2.inOut',
            onUpdate() {
              if (counterRef.current) {
                const v = Math.round(this.targets()[0].val);
                counterRef.current.textContent = v === 1 ? '1 DÍA' : `${v} DÍAS`;
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
        <span className="font-mono text-[10px] text-white/20 tracking-[0.3em]">05 // THE_MOMENT</span>
      </div>

      <div ref={(el: HTMLDivElement | null) => { elementsRef.current[1] = el; }} className="mt-6 opacity-0">
        <h2 className="text-[10vw] md:text-[6vw] font-pixel-square font-bold leading-[0.85] tracking-tight text-white uppercase">
          <GlitchText text="100× FASTER" trigger={isActive} className="text-inherit font-inherit" />
          <br />
          <span className="text-[6vw] md:text-[4vw] font-pixel-grid text-white/40">RIGHT NOW.</span>
        </h2>
      </div>

      <div ref={(el: HTMLDivElement | null) => { elementsRef.current[2] = el; }} className="mt-10 md:mt-14 opacity-0">
        <p className="font-mono text-sm md:text-base text-white/50 leading-relaxed max-w-2xl">
          Crear apps ahora es 100× más rápido.
          <span className="text-white/30"> No necesariamente fácil</span> — las que son de verdad buenas y funcionan requieren expertise.
        </p>
      </div>

      <div ref={(el: HTMLDivElement | null) => { elementsRef.current[3] = el; }} className="mt-10 opacity-0">
        <div className="flex items-center gap-6">
          <div className="text-center">
            <span className="font-mono text-[10px] text-white/20 tracking-widest block mb-2">ANTES</span>
            <span className="font-pixel-square text-3xl md:text-5xl text-white/20 line-through decoration-red-400/40">30 DÍAS</span>
          </div>
          <div className="font-mono text-2xl text-white/15">→</div>
          <div className="text-center">
            <span className="font-mono text-[10px] text-green-400/40 tracking-widest block mb-2">AHORA</span>
            <span ref={counterRef} className="font-pixel-square text-3xl md:text-5xl text-white/80">30 DÍAS</span>
          </div>
        </div>
      </div>

      <div ref={(el: HTMLDivElement | null) => { elementsRef.current[4] = el; }} className="mt-8 opacity-0">
        <p className="font-mono text-xs text-white/20">
          <span className="text-green-400/40">▸</span> La mayor revolución de AI agents está pasando en <span className="text-white/50">CÓDIGO</span>
        </p>
      </div>
    </div>
  );
};
