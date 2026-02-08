import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const NOISE = '▓▒░█▀▄┃┣┫╋╬═║01<>{}[]!?#*';

export const Manifesto: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const chapterRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const figureRef = useRef<HTMLDivElement>(null);
  const figureLabelRef = useRef<HTMLDivElement>(null);
  const block1Ref = useRef<HTMLDivElement>(null);
  const block1Text = useRef<HTMLParagraphElement>(null);
  const block2Ref = useRef<HTMLDivElement>(null);
  const block2Label = useRef<HTMLHeadingElement>(null);
  const block2Text = useRef<HTMLParagraphElement>(null);
  const block3Ref = useRef<HTMLDivElement>(null);
  const block3Label = useRef<HTMLHeadingElement>(null);
  const block3Title = useRef<HTMLParagraphElement>(null);
  const block3Text = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {

      // === Helpers ===
      const decode = (el: HTMLElement, finalText: string, dur = 0.7) => {
        const tl = gsap.timeline();
        tl.fromTo(el, { opacity: 0 }, { opacity: 1, duration: 0.1 });
        tl.to({ p: 0 }, {
          p: 1,
          duration: dur,
          ease: 'power2.out',
          onUpdate() {
            const progress = this.targets()[0].p;
            el.textContent = finalText.split('').map((c, i) => {
              if (c === ' ' || c === '\n') return c;
              return progress > (i / finalText.length) + 0.12
                ? c
                : NOISE[Math.floor(Math.random() * NOISE.length)];
            }).join('');
          },
          onComplete() { el.textContent = finalText; },
        }, '<');
        return tl;
      };

      const typeIn = (el: HTMLElement, text: string, speed = 0.012) => {
        const tl = gsap.timeline();
        tl.fromTo(el, { opacity: 0 }, { opacity: 1, duration: 0.05 });
        tl.to({ p: 0 }, {
          p: 1,
          duration: text.length * speed,
          ease: 'none',
          onUpdate() {
            const n = Math.floor(this.targets()[0].p * text.length);
            el.textContent = text.slice(0, n) + (this.targets()[0].p < 1 ? '█' : '');
          },
          onComplete() { el.textContent = text; },
        }, '<');
        return tl;
      };

      const glitchIn = (el: HTMLElement, dur = 0.4) => {
        const tl = gsap.timeline();
        tl.fromTo(el,
          { opacity: 0, x: -8, skewX: -3 },
          { opacity: 1, x: 0, skewX: 0, duration: dur, ease: 'power3.out' }
        );
        // Quick glitch flicker
        tl.to(el, { opacity: 0.3, x: 2, duration: 0.04 }, `-=${dur * 0.5}`);
        tl.to(el, { opacity: 1, x: 0, duration: 0.04 }, '>');
        return tl;
      };

      // === Init: hide everything ===
      gsap.set([chapterRef.current, titleRef.current, figureRef.current], { opacity: 0 });
      gsap.set([block1Ref.current, block2Ref.current, block3Ref.current], { opacity: 0 });

      // === Left column: Chapter + Title + Figure ===
      const leftTl = gsap.timeline({
        scrollTrigger: {
          trigger: chapterRef.current,
          start: 'top 85%',
          once: true,
        },
      });

      // Chapter label types in
      leftTl.add(() => {
        gsap.set(chapterRef.current, { opacity: 1 });
      });
      const chapterLabel = chapterRef.current?.querySelector('span');
      if (chapterLabel) {
        const chapterText = chapterLabel.textContent || '';
        chapterLabel.textContent = '';
        leftTl.add(typeIn(chapterLabel, chapterText, 0.018), 0);
      }
      const chapterDot = chapterRef.current?.querySelector('div');
      if (chapterDot) {
        leftTl.fromTo(chapterDot, { scale: 0 }, { scale: 1, duration: 0.3, ease: 'back.out(3)' }, 0);
      }

      // Title decodes from noise — store text, clear it, then decode
      if (titleRef.current) {
        const titleText = titleRef.current.textContent || '';
        titleRef.current.textContent = '';
        leftTl.add(() => { gsap.set(titleRef.current, { opacity: 1 }); }, '+=0.1');
        leftTl.add(decode(titleRef.current, titleText, 0.8), '<');
      }

      // Figure slides up
      if (figureRef.current) {
        leftTl.fromTo(figureRef.current,
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' },
          '-=0.3'
        );
        if (figureLabelRef.current) {
          const figText = figureLabelRef.current.textContent || '';
          figureLabelRef.current.textContent = '';
          leftTl.add(typeIn(figureLabelRef.current, figText, 0.02), '-=0.2');
        }
      }

      // === Block 1: Big quote ===
      if (block1Ref.current && block1Text.current) {
        const b1Text = block1Text.current.textContent || '';
        block1Text.current.textContent = '';

        const b1Tl = gsap.timeline({
          scrollTrigger: {
            trigger: block1Ref.current,
            start: 'top 80%',
            once: true,
          },
        });
        b1Tl.add(() => { gsap.set(block1Ref.current, { opacity: 1 }); });
        b1Tl.add(glitchIn(block1Ref.current!, 0.5), 0);
        b1Tl.add(decode(block1Text.current, b1Text, 1.0), 0.1);
      }

      // === Block 2: The Problem ===
      if (block2Ref.current && block2Label.current && block2Text.current) {
        const b2LabelText = block2Label.current.textContent || '';
        const b2BodyText = block2Text.current.textContent || '';
        block2Label.current.textContent = '';
        block2Text.current.textContent = '';

        const b2Tl = gsap.timeline({
          scrollTrigger: {
            trigger: block2Ref.current,
            start: 'top 80%',
            once: true,
          },
        });
        b2Tl.add(() => { gsap.set(block2Ref.current, { opacity: 1 }); });
        b2Tl.add(glitchIn(block2Ref.current!, 0.4), 0);
        b2Tl.add(typeIn(block2Label.current, b2LabelText, 0.025), 0.1);
        b2Tl.add(decode(block2Text.current, b2BodyText, 1.2), 0.3);
      }

      // === Block 3: The Sintax ===
      if (block3Ref.current && block3Label.current && block3Title.current && block3Text.current) {
        const b3LabelText = block3Label.current.textContent || '';
        const b3TitleText = block3Title.current.textContent || '';
        const b3BodyText = block3Text.current.textContent || '';
        block3Label.current.textContent = '';
        block3Title.current.textContent = '';
        block3Text.current.textContent = '';

        const b3Tl = gsap.timeline({
          scrollTrigger: {
            trigger: block3Ref.current,
            start: 'top 80%',
            once: true,
          },
        });
        b3Tl.add(() => { gsap.set(block3Ref.current, { opacity: 1 }); });
        b3Tl.add(glitchIn(block3Ref.current!, 0.4), 0);
        b3Tl.add(typeIn(block3Label.current, b3LabelText, 0.025), 0.1);
        b3Tl.add(decode(block3Title.current, b3TitleText, 0.8), 0.3);
        b3Tl.add(decode(block3Text.current, b3BodyText, 1.0), 0.6);
      }

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="manifesto" className="relative bg-white text-black border-b border-black">
      <div className="grid grid-cols-1 lg:grid-cols-2">

        {/* Left Column: Sticky Title */}
        <div className="lg:sticky lg:top-0 lg:h-screen p-8 md:p-16 border-b lg:border-b-0 lg:border-r border-black flex flex-col justify-between">
          <div>
            <div ref={chapterRef} className="flex items-center gap-2 mb-8">
              <div className="w-2 h-2 bg-black"></div>
              <span className="font-mono text-xs uppercase tracking-widest">Chapter 01: Core Belief</span>
            </div>
            <h2 ref={titleRef} className="text-6xl md:text-8xl font-pixel-triangle font-bold tracking-tighter leading-none mb-4">
              PURE FOCUS.
            </h2>
          </div>

          <div ref={figureRef} className="hidden lg:block relative w-full aspect-square border border-black overflow-hidden">
             <svg width="100%" height="100%" className="absolute inset-0">
                <line x1="0" y1="0" x2="100%" y2="100%" stroke="black" strokeWidth="1" />
                <line x1="100%" y1="0" x2="0" y2="100%" stroke="black" strokeWidth="1" />
                <circle cx="50%" cy="50%" r="25%" fill="none" stroke="black" strokeWidth="1" />
             </svg>
             <div ref={figureLabelRef} className="absolute inset-0 flex items-center justify-center font-mono text-xs bg-white/80 w-fit h-fit m-auto px-2">
               FIG 1.1: ELIMINATION
             </div>
          </div>
        </div>

        {/* Right Column: Scrollable Content */}
        <div className="p-8 md:p-16 lg:pt-32 flex flex-col gap-24">

          <div ref={block1Ref} className="relative">
            <div className="absolute -left-4 top-0 bottom-0 w-1 bg-black/10"></div>
            <p ref={block1Text} className="text-2xl md:text-4xl font-light leading-tight">
              Chaos is the default state of the universe. Without intervention, entropy consumes efficiency.
            </p>
          </div>

          <div ref={block2Ref}>
            <h3 ref={block2Label} className="font-mono text-xs uppercase tracking-widest mb-6 bg-black text-white w-fit px-2 py-1">The Problem</h3>
            <p ref={block2Text} className="text-xl text-neutral-600 leading-relaxed font-mono">
              You are drowning in low-bandwidth tasks. Spreadsheets, emails, manual data entry. This is the noise. It masks the signal. It kills creativity.
            </p>
          </div>

          <div ref={block3Ref} className="border-t border-black pt-12">
            <h3 ref={block3Label} className="font-mono text-xs uppercase tracking-widest mb-6 bg-black text-white w-fit px-2 py-1">The Sintax</h3>
            <p ref={block3Title} className="text-3xl md:text-5xl font-pixel-line font-bold leading-tight mb-8">
              We do not add. We subtract.
            </p>
            <p ref={block3Text} className="text-lg text-neutral-700 max-w-md">
              We remove the friction. We automate the mundane. We leave you with only what matters: Vision and Strategy.
            </p>
          </div>

        </div>
      </div>
    </section>
  );
};
