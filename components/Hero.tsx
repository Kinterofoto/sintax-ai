import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

const ScrollingData: React.FC = () => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const chars = '0123456789ABCDEF';
    const update = () => {
      let html = '';
      for (let i = 0; i < 30; i++) {
        let line = '';
        for (let j = 0; j < 8; j++) line += chars[Math.floor(Math.random() * chars.length)];
        html += `<div>${line}</div>`;
      }
      el.innerHTML = html;
    };
    update();
    const id = setInterval(update, 3000);
    return () => clearInterval(id);
  }, []);

  return (
    <div ref={ref} className="font-mono text-[8px] md:text-[9px] text-white/[0.04] leading-[1.8] select-none whitespace-nowrap" />
  );
};

export const Hero: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const bootRef = useRef<HTMLDivElement>(null);
  const titleGroupRef = useRef<HTMLDivElement>(null);
  const cursorRef = useRef<HTMLSpanElement>(null);
  const line1 = useRef<HTMLSpanElement>(null);
  const line2 = useRef<HTMLSpanElement>(null);
  const line3 = useRef<HTMLSpanElement>(null);
  const progressFill = useRef<HTMLDivElement>(null);
  const progressText = useRef<HTMLSpanElement>(null);
  const stat1 = useRef<HTMLDivElement>(null);
  const stat2 = useRef<HTMLDivElement>(null);
  const stat3 = useRef<HTMLDivElement>(null);
  const signalRef = useRef<HTMLSpanElement>(null);
  const intheRef = useRef<HTMLSpanElement>(null);
  const noiseRef = useRef<HTMLSpanElement>(null);
  const subtitleRef = useRef<HTMLDivElement>(null);
  const promptRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const NOISE = '▓▒░█▀▄┃┣┫╋╬═║01<>{}[]!?#*';

      const typeTo = (el: HTMLElement, text: string, speed = 0.025) => {
        return gsap.to({ p: 0 }, {
          p: 1,
          duration: text.length * speed,
          ease: 'none',
          onUpdate() {
            const n = Math.floor(this.targets()[0].p * text.length);
            el.textContent = text.slice(0, n);
          },
          onComplete() { el.textContent = text; },
        });
      };

      const decode = (el: HTMLElement, text: string, dur = 1) => {
        return gsap.to({ p: 0 }, {
          p: 1,
          duration: dur,
          ease: 'power2.out',
          onUpdate() {
            const progress = this.targets()[0].p;
            el.textContent = text.split('').map((c, i) => {
              if (c === ' ') return ' ';
              return progress > (i / text.length) + 0.15
                ? c
                : NOISE[Math.floor(Math.random() * NOISE.length)];
            }).join('');
          },
          onComplete() { el.textContent = text; },
        });
      };

      // Init
      gsap.set(titleGroupRef.current, { opacity: 0 });
      gsap.set(['.hero-cta', '.hero-ambient', subtitleRef.current, promptRef.current], { opacity: 0, y: 10 });
      gsap.set([stat1.current, stat2.current, stat3.current], { opacity: 0, x: -5 });
      gsap.set(progressFill.current, { scaleX: 0 });
      gsap.set(progressText.current, { opacity: 0 });

      // Blinking cursor
      gsap.to(cursorRef.current, { opacity: 0, duration: 0.53, repeat: -1, yoyo: true, ease: 'steps(1)' });

      const tl = gsap.timeline();

      // 1. Type command (faster speed 0.018)
      tl.add(typeTo(line1.current!, 'sintax:~$ deploy --automate --eliminate-noise', 0.018), 0.3);

      // 2. Init message
      tl.add(typeTo(line2.current!, 'Scanning workflows for inefficiencies...', 0.015), '+=0.12');

      // 3. Progress bar fills (faster)
      tl.to(progressFill.current, { scaleX: 1, duration: 0.6, ease: 'power1.inOut' }, '+=0.1');
      tl.to(progressText.current, { opacity: 1, duration: 0.1 }, '-=0.1');

      // 4. Status lines snap in (faster gaps)
      tl.to(stat1.current, { opacity: 1, x: 0, duration: 0.08 }, '+=0.06');
      tl.to(stat2.current, { opacity: 1, x: 0, duration: 0.08 }, '+=0.04');
      tl.to(stat3.current, { opacity: 1, x: 0, duration: 0.08 }, '+=0.04');

      // 5. Third typed line
      tl.add(typeTo(line3.current!, '> Chaos eliminated. Deploying signal...', 0.015), '+=0.1');

      // 6. Boot fades up, title enters (faster)
      tl.to(bootRef.current, { y: -40, opacity: 0.08, filter: 'blur(1px)', duration: 0.5, ease: 'power3.inOut' }, '+=0.2');
      tl.set(titleGroupRef.current, { opacity: 1 }, '-=0.2');

      // 7. Decode title (faster: 0.5s instead of 0.9s)
      tl.add(decode(signalRef.current!, 'SIGNAL', 0.5), '-=0.15');
      tl.add(decode(noiseRef.current!, 'NOISE', 0.5), '<0.08');

      // 8. IN THE bridge (faster)
      tl.fromTo(intheRef.current,
        { opacity: 0, letterSpacing: '1.5em' },
        { opacity: 0.35, letterSpacing: '0.5em', duration: 0.4, ease: 'power2.out' },
        '<0.1'
      );

      // 9. Subtitle + CTAs
      tl.to(subtitleRef.current, { opacity: 1, y: 0, duration: 0.4 }, '-=0.1');
      tl.to(promptRef.current, { opacity: 1, y: 0, duration: 0.4 }, '-=0.3');
      tl.to('.hero-ambient', { opacity: 1, duration: 0.8 }, '-=0.4');

      // No scroll parallax — boot plays once, content stays permanent

    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="relative min-h-[100dvh] flex flex-col justify-center items-center overflow-hidden font-mono px-4 md:px-12">

      {/* CRT scanlines — scoped to hero only */}
      <div className="pointer-events-none absolute inset-0 z-20 opacity-[0.035]" style={{
        backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 1px, rgba(0,0,0,0.3) 1px, rgba(0,0,0,0.3) 2px)',
        backgroundSize: '100% 2px',
      }} />

      {/* Screen vignette — scoped to hero only */}
      <div className="pointer-events-none absolute inset-0 z-20" style={{
        background: 'radial-gradient(ellipse at center, transparent 50%, rgba(0,0,0,0.5) 100%)',
      }} />

      {/* Background data streams */}
      <div className="hero-ambient absolute inset-0 flex justify-between px-4 md:px-8 overflow-hidden pointer-events-none opacity-0">
        <ScrollingData />
        <ScrollingData />
        <div className="hidden md:block"><ScrollingData /></div>
        <div className="hidden md:block"><ScrollingData /></div>
        <div className="hidden lg:block"><ScrollingData /></div>
      </div>

      {/* === BOOT SEQUENCE === */}
      <div ref={bootRef} className="absolute top-[12%] md:top-[15%] left-4 md:left-12 max-w-2xl w-full text-[10px] md:text-xs text-white/60 space-y-2 z-10">
        <div className="flex items-center gap-1">
          <span ref={line1} className="text-white/80"></span>
          <span ref={cursorRef} className="text-white">█</span>
        </div>
        <div>
          <span ref={line2} className="text-white/50"></span>
        </div>
        {/* Progress bar */}
        <div className="flex items-center gap-3 mt-1">
          <div className="w-48 md:w-64 h-[3px] bg-white/10 overflow-hidden">
            <div ref={progressFill} className="h-full bg-white/70 origin-left" />
          </div>
          <span ref={progressText} className="text-white/40 text-[9px]">COMPLETE</span>
        </div>
        {/* Status */}
        <div className="space-y-0.5 mt-2 text-[9px] md:text-[10px]">
          <div ref={stat1} className="flex items-center gap-2">
            <span className="text-white/30">manual_tasks</span>
            <span className="text-white/10">·····</span>
            <span className="text-red-400/60">ELIMINATED</span>
          </div>
          <div ref={stat2} className="flex items-center gap-2">
            <span className="text-white/30">ai_agents</span>
            <span className="text-white/10">·····</span>
            <span className="text-green-400/60">DEPLOYED</span>
          </div>
          <div ref={stat3} className="flex items-center gap-2">
            <span className="text-white/30">automation</span>
            <span className="text-white/10">·····</span>
            <span className="text-white/50">RUNNING</span>
          </div>
        </div>
        <div className="mt-2">
          <span ref={line3} className="text-white/40"></span>
        </div>
      </div>

      {/* === TITLE === */}
      <div ref={titleGroupRef} className="hero-title-group relative z-10 text-center select-none opacity-0">
        <div className="relative">
          <span ref={signalRef} className="block text-[20vw] md:text-[16vw] font-pixel-square font-bold leading-[0.85] tracking-[-0.05em] text-white uppercase hero-glow">
            SIGNAL
          </span>
        </div>

        <div className="flex items-center justify-center gap-3 md:gap-5 my-1 md:my-2">
          <span className="h-[1px] w-8 md:w-20 bg-white/15" />
          <span ref={intheRef} className="text-[10px] md:text-xs text-white/30 tracking-[0.5em] uppercase">IN THE</span>
          <span className="h-[1px] w-8 md:w-20 bg-white/15" />
        </div>

        <div className="relative">
          <span ref={noiseRef} className="block text-[20vw] md:text-[16vw] font-pixel-grid font-bold leading-[0.85] tracking-[-0.05em] text-white uppercase hero-glow">
            NOISE
          </span>
        </div>
      </div>

      {/* === SUBTITLE === */}
      <div ref={subtitleRef} className="hero-title-group absolute bottom-32 md:bottom-28 left-4 md:left-12 max-w-lg z-10 opacity-0">
        <p className="text-[10px] md:text-xs text-white/25 leading-relaxed">
          <span className="text-white/40">// </span>We destroy boring work. We organize chaos.<br/>
          <span className="text-white/40">// </span>Sintax AI rewrites the operating system of your business.
        </p>
      </div>

      {/* === TERMINAL PROMPT CTAs === */}
      <div ref={promptRef} className="hero-title-group absolute bottom-10 md:bottom-14 right-4 md:right-12 z-10 text-right space-y-3 opacity-0">
        <a
          href="https://wa.me/573115259295?text=Looking%20for%20signal%20in%20the%20noise"
          target="_blank"
          rel="noopener noreferrer"
          className="group flex items-center justify-end gap-3 text-xs md:text-sm text-white hover:text-white transition-all duration-300 border border-white/20 hover:border-white/60 hover:bg-white/[0.06] px-5 py-2.5 backdrop-blur-sm"
        >
          <span className="text-green-400/80 group-hover:text-green-400 transition-colors text-[10px]">▸</span>
          <span className="tracking-[0.2em] uppercase font-bold">initiate_handshake</span>
          <span className="text-white/30 group-hover:text-white/60 transition-colors">↵</span>
        </a>
        <a
          href="#manifesto"
          className="group flex items-center justify-end gap-2 text-[10px] md:text-xs text-white/30 hover:text-white/70 transition-colors duration-300"
        >
          <span className="text-white/15 group-hover:text-green-400/60 transition-colors">$</span>
          <span className="tracking-widest uppercase">explore_methodology</span>
          <span className="text-white/10 group-hover:text-white/30 transition-colors">↵</span>
        </a>
      </div>

      <style>{`
        .hero-glow {
          text-shadow: 0 0 80px rgba(255,255,255,0.04), 0 0 160px rgba(255,255,255,0.02);
        }
        .hero-title-group {
          will-change: transform, opacity;
        }
      `}</style>
    </section>
  );
};
