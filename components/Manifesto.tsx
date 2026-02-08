import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const NOISE_CHARS = '▓▒░█▀▄┃┣┫╋╬═║01<>{}[]!?#*';

export const Manifesto: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const hasPlayedRef = useRef(false);

  // Terminal line refs
  const termLine1 = useRef<HTMLDivElement>(null);
  const termLine2 = useRef<HTMLDivElement>(null);
  const termLine3 = useRef<HTMLDivElement>(null);
  const termLine4 = useRef<HTMLDivElement>(null);
  const termLine5 = useRef<HTMLDivElement>(null);
  const termLine6 = useRef<HTMLDivElement>(null);
  const termLine7 = useRef<HTMLDivElement>(null);
  const termLine8 = useRef<HTMLDivElement>(null);
  const termLine9 = useRef<HTMLDivElement>(null);
  const termProgressFill = useRef<HTMLDivElement>(null);
  const termProgressText = useRef<HTMLSpanElement>(null);
  const termResult = useRef<HTMLDivElement>(null);
  const termCursor = useRef<HTMLSpanElement>(null);
  const glitchOverlay = useRef<HTMLDivElement>(null);

  // Content animation refs
  const leftColRef = useRef<HTMLDivElement>(null);
  const chapterRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const figureRef = useRef<HTMLDivElement>(null);
  const block1Ref = useRef<HTMLDivElement>(null);
  const block2Ref = useRef<HTMLDivElement>(null);
  const block3Ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const overlay = overlayRef.current;
    if (!section || !overlay) return;

    const ctx = gsap.context(() => {

      // Helper: type text character by character
      const typeTo = (el: HTMLElement, text: string, speed = 0.018) => {
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

      // Helper: decode from noise to text
      const decode = (el: HTMLElement, text: string, dur = 0.5) => {
        return gsap.to({ p: 0 }, {
          p: 1,
          duration: dur,
          ease: 'power2.out',
          onUpdate() {
            const progress = this.targets()[0].p;
            el.textContent = text.split('').map((c, i) => {
              if (c === ' ' || c === '\n') return c;
              return progress > (i / text.length) + 0.15
                ? c
                : NOISE_CHARS[Math.floor(Math.random() * NOISE_CHARS.length)];
            }).join('');
          },
          onComplete() { el.textContent = text; },
        });
      };

      // Init: hide all terminal lines, hide content
      const termLines = [termLine1, termLine2, termLine3, termLine4, termLine5, termLine6, termLine7, termLine8, termLine9, termResult];
      termLines.forEach(ref => {
        if (ref.current) gsap.set(ref.current, { opacity: 0, x: -5 });
      });
      gsap.set(termProgressFill.current, { scaleX: 0 });
      gsap.set(termProgressText.current, { opacity: 0 });
      gsap.set(glitchOverlay.current, { opacity: 0 });

      // Hide content initially
      gsap.set(contentRef.current, { opacity: 0 });
      gsap.set([chapterRef.current, titleRef.current, figureRef.current], { opacity: 0, y: 20 });
      gsap.set([block1Ref.current, block2Ref.current, block3Ref.current], { opacity: 0, y: 30 });

      // Blinking cursor
      gsap.to(termCursor.current, { opacity: 0, duration: 0.5, repeat: -1, yoyo: true, ease: 'steps(1)' });

      // ScrollTrigger
      ScrollTrigger.create({
        trigger: section,
        start: 'top 80%',
        once: true,
        onEnter: () => {
          if (hasPlayedRef.current) return;
          hasPlayedRef.current = true;
          runTerminalSequence();
        },
      });

      function runTerminalSequence() {
        const tl = gsap.timeline();

        // Phase 1: Command input
        tl.to(termLine1.current, { opacity: 1, x: 0, duration: 0.05 }, 0.2);
        tl.add(typeTo(termLine1.current!.querySelector('.term-text') as HTMLElement, 'sintax:~$ focus --purge-chaos --mode=absolute', 0.016), 0.25);

        // Phase 2: Scanning
        tl.to(termLine2.current, { opacity: 1, x: 0, duration: 0.05 }, '+=0.15');
        tl.add(typeTo(termLine2.current!.querySelector('.term-text') as HTMLElement, 'Initializing focus protocol...', 0.014), '<');

        // Phase 3: Progress bar
        tl.to(termProgressText.current, { opacity: 1, duration: 0.1 }, '+=0.08');
        tl.to(termProgressFill.current, { scaleX: 1, duration: 0.7, ease: 'power1.inOut' }, '<');

        // Phase 4: Noise items detected & eliminated
        const noiseItems = [
          { ref: termLine3, text: '  [×] spreadsheets_manual ........... PURGED' },
          { ref: termLine4, text: '  [×] email_overload ................ PURGED' },
          { ref: termLine5, text: '  [×] repetitive_data_entry ......... PURGED' },
          { ref: termLine6, text: '  [×] cognitive_overhead ............ PURGED' },
          { ref: termLine7, text: '  [×] low_bandwidth_tasks ........... PURGED' },
        ];

        noiseItems.forEach((item, i) => {
          tl.to(item.ref.current, { opacity: 1, x: 0, duration: 0.04 }, `+=0.06`);
          tl.add(typeTo(item.ref.current!.querySelector('.term-text') as HTMLElement, item.text, 0.008), '<');
        });

        // Phase 5: Summary line
        tl.to(termLine8.current, { opacity: 1, x: 0, duration: 0.05 }, '+=0.1');
        tl.add(typeTo(termLine8.current!.querySelector('.term-text') as HTMLElement, '5 noise sources eliminated. System clean.', 0.014), '<');

        // Phase 6: Final output
        tl.to(termLine9.current, { opacity: 1, x: 0, duration: 0.05 }, '+=0.08');
        tl.add(typeTo(termLine9.current!.querySelector('.term-text') as HTMLElement, '> Only signal remains. Entering PURE FOCUS...', 0.012), '<');

        // Phase 7: Result - big decoded text
        tl.to(termResult.current, { opacity: 1, x: 0, duration: 0.1 }, '+=0.15');
        tl.add(decode(termResult.current!.querySelector('.term-decode') as HTMLElement, 'PURE FOCUS ACTIVATED', 0.6), '<');

        // Phase 8: Glitch burst + overlay dissolve
        tl.to(glitchOverlay.current, { opacity: 1, duration: 0.05 }, '+=0.3');
        tl.to(glitchOverlay.current, { opacity: 0, duration: 0.05 }, '+=0.05');
        tl.to(glitchOverlay.current, { opacity: 0.8, duration: 0.04 }, '+=0.03');
        tl.to(glitchOverlay.current, { opacity: 0, duration: 0.04 }, '+=0.04');

        // Phase 9: Terminal overlay dissolves
        tl.to(overlayRef.current, {
          opacity: 0,
          duration: 0.5,
          ease: 'power2.inOut',
          onComplete() {
            if (overlayRef.current) overlayRef.current.style.pointerEvents = 'none';
          },
        }, '+=0.05');

        // Phase 10: Content reveals
        tl.to(contentRef.current, { opacity: 1, duration: 0.3 }, '-=0.3');
        tl.to(chapterRef.current, { opacity: 1, y: 0, duration: 0.4 }, '-=0.15');
        tl.to(titleRef.current, { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' }, '-=0.2');
        tl.to(figureRef.current, { opacity: 1, y: 0, duration: 0.5 }, '-=0.3');
        tl.to(block1Ref.current, { opacity: 1, y: 0, duration: 0.5 }, '-=0.2');
        tl.to(block2Ref.current, { opacity: 1, y: 0, duration: 0.5 }, '-=0.3');
        tl.to(block3Ref.current, { opacity: 1, y: 0, duration: 0.5 }, '-=0.3');
      }

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="manifesto" className="relative bg-white text-black border-b border-black">

      {/* ===== TERMINAL OVERLAY ===== */}
      <div
        ref={overlayRef}
        className="absolute inset-0 z-30 bg-[#050505] flex items-center justify-center overflow-hidden"
      >
        {/* Scanlines */}
        <div className="absolute inset-0 pointer-events-none opacity-[0.04]" style={{
          backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 1px, rgba(0,0,0,0.4) 1px, rgba(0,0,0,0.4) 2px)',
          backgroundSize: '100% 2px',
        }} />

        {/* Vignette */}
        <div className="absolute inset-0 pointer-events-none" style={{
          background: 'radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,0.6) 100%)',
        }} />

        {/* Glitch flash */}
        <div ref={glitchOverlay} className="absolute inset-0 z-10 pointer-events-none bg-white mix-blend-difference" />

        {/* Terminal content */}
        <div className="relative z-20 w-full max-w-3xl px-6 md:px-12 font-mono text-[10px] md:text-xs space-y-1.5">

          <div ref={termLine1} className="flex items-center gap-1 text-white/80">
            <span className="term-text"></span>
            <span ref={termCursor} className="text-white text-[11px]">█</span>
          </div>

          <div ref={termLine2} className="text-white/50">
            <span className="term-text"></span>
          </div>

          {/* Progress bar */}
          <div className="flex items-center gap-3 py-1">
            <div className="w-48 md:w-72 h-[3px] bg-white/10 overflow-hidden">
              <div ref={termProgressFill} className="h-full bg-white/70 origin-left" />
            </div>
            <span ref={termProgressText} className="text-white/40 text-[9px]">SCANNING COMPLETE</span>
          </div>

          {/* Noise items being purged */}
          <div ref={termLine3} className="text-red-400/70">
            <span className="term-text"></span>
          </div>
          <div ref={termLine4} className="text-red-400/70">
            <span className="term-text"></span>
          </div>
          <div ref={termLine5} className="text-red-400/70">
            <span className="term-text"></span>
          </div>
          <div ref={termLine6} className="text-red-400/70">
            <span className="term-text"></span>
          </div>
          <div ref={termLine7} className="text-red-400/70">
            <span className="term-text"></span>
          </div>

          {/* Summary */}
          <div ref={termLine8} className="text-white/60 pt-2">
            <span className="term-text"></span>
          </div>

          {/* Final line */}
          <div ref={termLine9} className="text-white/40">
            <span className="term-text"></span>
          </div>

          {/* Big decoded result */}
          <div ref={termResult} className="pt-6">
            <span className="term-decode text-2xl md:text-4xl font-pixel-triangle font-bold text-white tracking-tighter"></span>
          </div>

        </div>
      </div>

      {/* ===== ACTUAL CONTENT ===== */}
      <div ref={contentRef} className="grid grid-cols-1 lg:grid-cols-2">

        {/* Left Column: Sticky Title */}
        <div ref={leftColRef} className="lg:sticky lg:top-0 lg:h-screen p-8 md:p-16 border-b lg:border-b-0 lg:border-r border-black flex flex-col justify-between">
          <div>
            <div ref={chapterRef} className="flex items-center gap-2 mb-8">
              <div className="w-2 h-2 bg-black"></div>
              <span className="font-mono text-xs uppercase tracking-widest">Chapter 01: Core Belief</span>
            </div>
            <h2 ref={titleRef} className="text-6xl md:text-8xl font-pixel-triangle font-bold tracking-tighter leading-none mb-4">
              PURE<br/>FOCUS.
            </h2>
          </div>

          <div ref={figureRef} className="hidden lg:block relative w-full aspect-square border border-black overflow-hidden">
             <svg width="100%" height="100%" className="absolute inset-0">
                <line x1="0" y1="0" x2="100%" y2="100%" stroke="black" strokeWidth="1" />
                <line x1="100%" y1="0" x2="0" y2="100%" stroke="black" strokeWidth="1" />
                <circle cx="50%" cy="50%" r="25%" fill="none" stroke="black" strokeWidth="1" />
             </svg>
             <div className="absolute inset-0 flex items-center justify-center font-mono text-xs bg-white/80 w-fit h-fit m-auto px-2">
               FIG 1.1: ELIMINATION
             </div>
          </div>
        </div>

        {/* Right Column: Scrollable Content */}
        <div className="p-8 md:p-16 lg:pt-32 flex flex-col gap-24">

          <div ref={block1Ref} className="relative">
            <div className="absolute -left-4 top-0 bottom-0 w-1 bg-black/10"></div>
            <p className="text-2xl md:text-4xl font-light leading-tight">
              Chaos is the default state of the universe. Without intervention, entropy consumes efficiency.
            </p>
          </div>

          <div ref={block2Ref}>
            <h3 className="font-mono text-xs uppercase tracking-widest mb-6 bg-black text-white w-fit px-2 py-1">The Problem</h3>
            <p className="text-xl text-neutral-600 leading-relaxed font-mono">
              You are drowning in low-bandwidth tasks. Spreadsheets, emails, manual data entry. This is the noise. It masks the signal. It kills creativity.
            </p>
          </div>

          <div ref={block3Ref} className="border-t border-black pt-12">
            <h3 className="font-mono text-xs uppercase tracking-widest mb-6 bg-black text-white w-fit px-2 py-1">The Sintax</h3>
            <p className="text-3xl md:text-5xl font-pixel-line font-bold leading-tight mb-8">
              We do not add.<br/>We subtract.
            </p>
            <p className="text-lg text-neutral-700 max-w-md">
              We remove the friction. We automate the mundane. We leave you with only what matters: Vision and Strategy.
            </p>
          </div>

        </div>
      </div>
    </section>
  );
};
