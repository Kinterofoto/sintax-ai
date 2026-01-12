import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import SplitType from 'split-type';

export const Hero: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    if (!titleRef.current) return;

    const text = new SplitType(titleRef.current, { types: 'chars,lines' });

    const ctx = gsap.context(() => {
      // Entrance animation for characters
      gsap.from(text.chars, {
        y: 100,
        opacity: 0,
        rotateX: -90,
        stagger: 0.015,
        duration: 1.2,
        ease: 'power4.out',
      });

      gsap.from('.hero-sub-element', {
        y: 30,
        opacity: 0,
        stagger: 0.1,
        duration: 1,
        delay: 0.6,
        ease: 'power3.out',
      });

      // Scroll Parallax
      gsap.to(titleRef.current, {
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        },
        y: 100,
        opacity: 0.3,
      });
    }, containerRef);

    return () => {
      ctx.revert();
      text.revert();
    };
  }, []);

  return (
    <section ref={containerRef} className="relative min-h-[100dvh] flex flex-col justify-center px-4 md:px-12 bg-transparent overflow-hidden">

      <div className="max-w-[1800px] mx-auto w-full relative z-10">
        <div className="flex flex-col gap-12">

          <div className="hero-sub-element font-mono text-[10px] mb-2 flex items-center gap-4 text-white/30">
            <span className="w-12 h-[1px] bg-white/10"></span>
            <span>ESTABLISHED_2026 // SINTAX_PROTOCOL</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end">
            <div className="lg:col-span-9">
              <h1 ref={titleRef} className="text-[14vw] md:text-[11vw] font-bold leading-[0.8] tracking-tighter text-white uppercase select-none">
                SIGNAL<br />
                <span className="text-cement">IN THE</span><br />
                NOISE
              </h1>
            </div>

            <div className="lg:col-span-3 flex flex-col justify-end pb-4 hero-sub-element">
              <div className="border-l border-cement/30 pl-6">
                <p className="font-mono text-sm text-neutral-400 mb-8 leading-relaxed max-w-xs">
                  // DEPLOYING ORDER <br />
                  We destroy boring work. We organize chaos.
                  Sintax AI rewrites the operating system of your business.
                </p>
                <a href="#manifesto" className="group inline-flex items-center gap-4 text-white font-mono text-xs uppercase tracking-widest overflow-hidden h-6">
                  <span className="relative flex flex-col transition-transform duration-300 group-hover:-translate-y-full">
                    <span className="border-b border-white pb-1">Explore Methodology</span>
                    <span className="border-b border-white pb-1">Explore Methodology</span>
                  </span>
                  <span className="text-lg">↘</span>
                </a>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Simplified Status Indicators - Right Side Balance */}
      <div className="absolute bottom-12 right-12 hidden md:block text-right hero-sub-element">
        <div className="font-mono text-[10px] text-white/20 uppercase tracking-[0.2em] space-y-1">
          <div>active_depuration</div>
          <div>latency: 0.0001ms</div>
        </div>
      </div>

      <style>{`
        .hero-sub-element {
          will-change: transform, opacity;
        }
        .text-cement {
          color: #333333; /* Neutral cement grey, no blue */
        }
        .border-cement {
          border-color: #333333;
        }
      `}</style>
    </section>
  );
};