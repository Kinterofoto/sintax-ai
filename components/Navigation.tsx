import React, { useState, useEffect } from 'react';
import { Menu, X, Plus } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const ScrambleText: React.FC<{ text: string; delay?: number; isVisible: boolean }> = ({ text, delay = 0, isVisible }) => {
  const [displayText, setDisplayText] = useState('');
  const chars = '0123456789!<>-_\\/[]{}—=+*^?#';

  useEffect(() => {
    if (!isVisible) {
      setDisplayText('');
      return;
    }

    let timeout: ReturnType<typeof setTimeout>;
    let iteration = 0;
    const totalIterations = text.length + 5;

    const startAnimation = () => {
      const interval = setInterval(() => {
        setDisplayText(() => {
          return text
            .split('')
            .map((char, index) => {
              if (index < iteration - 2) return text[index];
              if (index < iteration) return chars[Math.floor(Math.random() * chars.length)];
              return '';
            })
            .join('');
        });

        iteration += 0.5;

        if (iteration >= totalIterations) {
          clearInterval(interval);
          setDisplayText(text);
        }
      }, 30);
      return () => clearInterval(interval);
    };

    timeout = setTimeout(startAnimation, delay * 1000);

    return () => {
      clearTimeout(timeout);
    };
  }, [text, delay, isVisible]);

  return <span>{displayText}</span>;
};

export const Navigation: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [time, setTime] = useState('');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTime(now.toLocaleTimeString('en-US', { hour12: false, hour: '2-digit', minute: '2-digit', second: '2-digit' }));
    };
    const timer = setInterval(updateTime, 1000);
    updateTime();
    return () => clearInterval(timer);
  }, []);

  const navLinks = [
    { label: 'MANIFESTO', href: '#manifesto' },
    { label: 'PROTOCOLS', href: '#protocol' },
    { label: 'ARCHITECTURE', href: '#plans' },
  ];

  return (
    <>
      {/* Top Bar Fixed */}
      <nav className="fixed top-0 left-0 w-full z-50 flex justify-between items-start p-4 md:p-6 mix-blend-difference text-white">

        {/* Top Left: Logo */}
        <div className="flex flex-col">
          <a href="#" className="text-lg font-bold tracking-tighter font-sans leading-none">
            SINTAX.AI™
          </a>
          <span className="text-[10px] font-mono opacity-60">VER 2.5 // STABLE</span>
        </div>

        {/* Top Right: Time & Menu Toggle */}
        <div className="flex items-center gap-6">
          <div className="hidden md:flex font-mono text-xs gap-2 items-center opacity-70">
            <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
            SYSTEM: ONLINE
            <span className="ml-4 tabular-nums">[{time}]</span>
          </div>

          <button
            onClick={() => setIsOpen(!isOpen)}
            className="group flex items-center gap-2 font-mono text-xs uppercase hover:bg-white hover:text-black px-4 py-2 transition-all duration-300 border border-white/20 hover:border-white rounded-sm backdrop-blur-sm"
          >
            {isOpen ? 'Close' : 'Menu'}
            {isOpen ? <X className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
          </button>
        </div>
      </nav>

      {/* Full Screen Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-black z-40 flex flex-col justify-center items-center overflow-hidden"
          >
            {/* Scanlines effect */}
            <div className="absolute inset-0 pointer-events-none z-10 opacity-[0.03]"
              style={{
                backgroundImage: 'linear-gradient(rgba(18, 16, 16, 0) 50%, rgba(255, 255, 255, 0.25) 50%), linear-gradient(90deg, rgba(255, 0, 0, 0.06), rgba(0, 255, 0, 0.02), rgba(0, 0, 255, 0.06))',
                backgroundSize: '100% 2px, 3px 100%'
              }}>
            </div>

            <div className="relative z-20 flex flex-col space-y-4 md:space-y-6 px-4 max-w-4xl w-full">
              {navLinks.map((link, i) => (
                <div key={link.label} className="group relative">
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 + (i * 0.1) }}
                    className="flex items-baseline gap-4 md:gap-8"
                  >
                    <span className="font-mono text-[10px] md:text-sm text-cement/60 tabular-nums">
                      0{i + 1}_
                    </span>
                    <a
                      href={link.href}
                      onClick={() => setIsOpen(false)}
                      className="text-4xl md:text-8xl font-black tracking-tighter text-white hover:text-cement transition-colors duration-300 uppercase"
                    >
                      <ScrambleText text={link.label} delay={0.3 + (i * 0.1)} isVisible={isOpen} />
                    </a>
                  </motion.div>
                </div>
              ))}

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="pt-12 border-t border-white/10 mt-12"
              >
                <a
                  href="https://wa.me/573115259295?text=Looking%20for%20signal%20in%20the%20noise"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setIsOpen(false)}
                  className="group flex items-center gap-4 text-xl md:text-3xl font-mono text-cement hover:text-white transition-colors"
                >
                  <span className="w-8 h-[1px] bg-cement group-hover:bg-white transition-colors"></span>
                  <ScrambleText text="INITIATE_HANDSHAKE" delay={0.8} isVisible={isOpen} />
                </a>
              </motion.div>
            </div>

            {/* Background Grid */}
            <div className="absolute inset-0 pointer-events-none opacity-[0.05]"
              style={{
                backgroundImage: 'linear-gradient(to right, #ffffff 1px, transparent 1px), linear-gradient(to bottom, #ffffff 1px, transparent 1px)',
                backgroundSize: '4rem 4rem',
              }}>
            </div>

            {/* Corner Indicators */}
            <div className="absolute top-8 left-8 font-mono text-[8px] opacity-30 text-white italic">
              NAVIGATION_INTERFACE_V2.5
            </div>
            <div className="absolute bottom-8 right-8 font-mono text-[8px] opacity-30 text-white italic">
              ©SINTAX_CORP_2026
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Bottom Fixed Elements */}
      <div className="fixed bottom-0 left-0 w-full z-30 p-4 flex justify-between items-end pointer-events-none mix-blend-difference text-white">
        <div className="font-mono text-[10px] md:text-xs">
          <p className="tabular-nums">COORD.X: {typeof window !== 'undefined' ? window.scrollX.toFixed(0) : 0}</p>
          <p className="tabular-nums">COORD.Y: {typeof window !== 'undefined' ? (window.scrollY || document.documentElement.scrollTop).toFixed(0) : 0}</p>
        </div>
        <div className="font-mono text-[10px] md:text-xs text-right">
          <p>STATUS: OPERATIONAL</p>
          <p className="opacity-50">SCROLL_INPUT_WAITING...</p>
        </div>
      </div>
    </>
  );
};