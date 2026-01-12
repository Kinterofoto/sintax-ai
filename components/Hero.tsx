import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import SplitType from 'split-type';

export const Hero: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    if (!titleRef.current) return;

    const text = new SplitType(titleRef.current, { types: 'chars,lines' });
    const chars = text.chars;

    if (!chars) return;

    const ctx = gsap.context(() => {
      // Set initial styles for characters reach for glitch
      gsap.set(chars, {
        opacity: 0,
        y: 20,
        filter: 'blur(10px) brightness(2)',
      });

      // Title noise overlay animation
      gsap.to('.title-noise', {
        opacity: 0,
        duration: 2,
        delay: 1,
        ease: 'power2.inOut',
      });

      // Character scramble and entrance
      chars.forEach((char, i) => {
        const originalText = char.innerText;
        const scrambleChars = '0123456789!<>-_\\/[]{}—=+*^?#';

        const tl = gsap.timeline({
          delay: i * 0.02,
        });

        tl.to(char, {
          opacity: 1,
          y: 0,
          filter: 'blur(0px) brightness(1)',
          duration: 0.6,
          ease: 'power4.out',
        })
          .to(char, {
            duration: 0.8,
            onUpdate: function () {
              const progress = this.progress();
              if (progress < 0.8) {
                if (Math.random() > 0.1) {
                  char.innerText = scrambleChars[Math.floor(Math.random() * scrambleChars.length)];
                }
              } else {
                if (Math.random() > 0.8) {
                  char.innerText = originalText;
                }
              }
            },
            onComplete: () => {
              char.innerText = originalText;
            }
          }, '<');

        // Randomly add a "distortion" class for a moment
        tl.to(char, {
          duration: 0.1,
          repeat: 2,
          yoyo: true,
          className: '+=glitch-active',
          delay: Math.random() * 0.5
        });
      });

      gsap.from('.hero-sub-element', {
        y: 30,
        opacity: 0,
        stagger: 0.1,
        duration: 1,
        delay: 1.2,
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
            <div className="lg:col-span-9 relative">
              <div className="title-noise absolute inset-0 bg-noise opacity-20 pointer-events-none z-20 mix-blend-overlay"></div>
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
                <div className="flex flex-col gap-6">
                  <a
                    href="https://wa.me/573115259295?text=Looking%20for%20signal%20in%20the%20noise"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group inline-flex items-center gap-4 text-white font-mono text-sm font-bold uppercase tracking-[0.2em] overflow-hidden h-8 bg-white/5 hover:bg-white/10 px-4 transition-colors border border-white/20"
                  >
                    <span>INITIATE_HANDSHAKE ↘</span>
                  </a>
                  <a href="#manifesto" className="group inline-flex items-center gap-4 text-neutral-500 hover:text-white font-mono text-xs uppercase tracking-widest overflow-hidden h-6 transition-colors">
                    <span className="relative flex flex-col transition-transform duration-300 group-hover:-translate-y-full">
                      <span className="border-b border-cement pb-1">Explore Methodology</span>
                      <span className="border-b border-white pb-1">Explore Methodology</span>
                    </span>
                    <span className="text-lg">↘</span>
                  </a>
                </div>
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
        
        .char {
          display: inline-block;
          will-change: transform, opacity, filter;
        }

        .glitch-active {
            animation: textGlitch 0.15s infinite;
            color: #fff;
            text-shadow: 3px 0 #ff00c1, -3px 0 #00fff9;
            filter: contrast(150%) brightness(150%);
        }

        @keyframes textGlitch {
          0% { transform: translate(0); clip-path: inset(0 0 0 0); }
          20% { transform: translate(-5px, 2px); clip-path: inset(10% 0 40% 0); }
          40% { transform: translate(-5px, -2px); clip-path: inset(30% 0 10% 0); }
          60% { transform: translate(5px, 2px); clip-path: inset(50% 0 20% 0); }
          80% { transform: translate(5px, -2px); clip-path: inset(10% 0 60% 0); }
          100% { transform: translate(0); clip-path: inset(0 0 0 0); }
        }
      `}</style>
    </section>
  );
};